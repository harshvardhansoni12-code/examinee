export const runtime = "nodejs";

import { getServerSession } from "next-auth";
import { extractAndStoreText } from "../../../../lib/pdfService";
import { getText } from "../../../../lib/text";
import { GoogleGenerativeAI } from "@google/generative-ai";
//import { prisma } from "../../../../lib/prisma";
export async function POST(req) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  console.log("KEY:", process.env.GEMINI_API_KEY);
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
    const buffer = Buffer.from(await file.arrayBuffer());
    // const textFounded = await prisma.text.findUnique({
    //   where: { id: textId },
    // });
    // if (!textFounded) {
    //   return Response.json({ error: "Text not found" }, { status: 404 });
    // }
    // const text = textFounded.text;
    // console.log(text);
    // return Response.json({
    //   success: true,
    //   textId,
    //   preview: text.slice(0, 300),
    // });
    const { textId } = await extractAndStoreText(buffer, userId);
    const { text } = await getText({ textId });

    if (text) {
      const prompt = `
You are an expert teacher.

Generate high-quality multiple choice questions (MCQs) from the given ${text}.

Instructions:
- Create exactly 5 questions
- Each question must test understanding, not just memorization
- Avoid very easy or trivial questions
- Focus on important concepts only

Format:
Return ONLY valid JSON. Do not include any explanation or extra text.

JSON structure:
{
  "questions": [
    {
      "question": "string",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "exact option text"
    }
  ]
}

Rules:
- Each question must have exactly 4 options
- Only ONE correct answer per question
- Do not repeat similar questions
- Keep options clear and distinct
- Do not include numbering like "Q1", "Q2"
- Do not include markdown or backticks

Now generate questions from the following text:
`;
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(prompt);
      const response = result.response.text();
      console.log("RESULT:", response);
      return Response.json({ response: response });
    }
    //prefer gemini-2.5-flash for best performance
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: e.message || "Failed to process PDF" },
      { status: 500 },
    );
  }
}
