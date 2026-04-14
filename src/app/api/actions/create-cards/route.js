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
      const prompt = `Convert the following text into exactly 5 concise revision cards.

Guidelines:

Each card should have a clear title.
Include key points only (bullet format preferred).
Keep content short, crisp, and easy to revise.
Highlight important terms, definitions, or formulas.
Avoid unnecessary explanations or long sentences.
Make each card focused on one subtopic.

Text:${text}
`;
      //gemini-2.5-flash
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
      });
      const result = await model.generateContent(prompt);
      const response = result.response.text();
      console.log("RESULT:", response);
      const mcqCreated = await prisma.mcq.create({
        data: {
          mcq: response,
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
      if (!mcqCreated) {
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
