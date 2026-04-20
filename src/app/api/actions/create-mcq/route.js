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
You are an expert teacher. Generate high-quality multiple choice questions (MCQs).

Instructions:
- Create exactly 10 questions from the given text
- Each question must test understanding, not just memorization
- Avoid very easy or trivial questions
- Focus on important concepts only

CRITICAL: Return ONLY a valid JSON object. Do not wrap in markdown code blocks. Do not add any explanation before or after.

Required JSON format:
{
  "questions": [
    {
      "question": "What is the capital of France?",
      "options": ["Paris", "London", "Berlin", "Madrid"],
      "correctAnswer": "Paris"
    },
    {
      "question": "Second question here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option B"
    }
  ]
}

Rules:
- Must generate exactly 10 questions
- Each question must have exactly 4 options in an array
- correctAnswer must match exactly one of the 4 options
- Only ONE correct answer per question
- Do not repeat similar questions
- Keep options clear and distinct
- Do not include numbering like "Q1", "Q2"
- Do not use markdown formatting, backticks, or code blocks

Text to generate questions from:
${text}

Remember: Return ONLY the JSON object, nothing else.
`;
      //gemini-2.5-flash
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
      });
      const result = await model.generateContent(prompt);
      let response = result.response.text();
      console.log("Raw RESULT:", response);
      
      // Clean the response - remove markdown code blocks and extra whitespace
      response = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      // Try to parse the JSON to validate it
      let parsedMcq;
      try {
        parsedMcq = JSON.parse(response);
        console.log("Parsed MCQ count:", parsedMcq.questions ? parsedMcq.questions.length : 0);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        console.error("Response that failed to parse:", response);
        return Response.json({ error: "Failed to parse AI response" }, { status: 500 });
      }
      
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
      return Response.json({ 
        success: true,
        data: parsedMcq,
        mcqId: mcqCreated.id
      });
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
