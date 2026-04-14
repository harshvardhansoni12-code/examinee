/*Create a concise 100-word explanatory summary of the following text for revision purposes.

Guidelines:

Keep it exactly or close to 100 words.
Focus on key concepts, main ideas, and important details.
Use simple, clear language for quick understanding.
Avoid unnecessary examples or repetition.
Ensure the summary is easy to revise quickly before exams.

Text:
[Paste your content here] */
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
      const prompt = `Create a concise 100-word explanatory summary of the following text for revision purposes.

Guidelines:

Keep it exactly or close to 100 words.
Focus on key concepts, main ideas, and important details.
Use simple, clear language for quick understanding.
Avoid unnecessary examples or repetition.
Ensure the summary is easy to revise quickly before exams.

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
