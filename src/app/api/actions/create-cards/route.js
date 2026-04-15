export const runtime = "nodejs";
import { prisma } from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { extractAndStoreText } from "../../../../lib/pdfService";
import { getText } from "../../../../lib/text";
import { GoogleGenerativeAI } from "@google/generative-ai";
//import { prisma } from "../../../../lib/prisma";
export async function POST(req) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    const session = await getServerSession();
    if (!session || !session.user) {
      return Response.json("error unauthorized", { status: 401 });
    }
    const userId = session.user.email;
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }
    //
    const buffer = Buffer.from(await file.arrayBuffer());
    const { textId } = await extractAndStoreText(buffer, userId);
    const { text } = await getText({ textId });
    if (!text) {
      return Response.json({ error: "No text found" }, { status: 400 });
    }
    if (text) {
      const prompt = `
Convert the following text into EXACTLY 5 revision cards in JSON format.

Return ONLY valid JSON. No extra text.

Format:
[
  {
    "title": "string",
    "points": ["point1", "point2", "point3"]
  }
]

Text:
${text}
`;
      //gemini-2.5-flash
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
      });
      const result = await model.generateContent(prompt);
      const response = result.response.text();
      console.log("RESULT:", response);
      const cardCreated = await prisma.cards.create({
        data: {
          cards: response,
          author: {
            connect: {
              email: userId,
            },
          },
          text: {
            connect: {
              id: textId,
            },
          },
        },
      });
      if (!cardCreated) {
        return Response.json("mcq not create", { status: 401 });
      }
      return Response.json({ response: response });
    }
    //prefer gemini-2.5-flash
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: e.message || "Failed to process PDF" },
      { status: 500 },
    );
  }
}
