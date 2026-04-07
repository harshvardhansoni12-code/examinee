export const runtime = "nodejs";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../lib/prisma";

export async function POST(req) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user) {
      return Response.json({ error: "Unauthorized - No session" }, { status: 401 });
    }
    
    // Try to get user ID from session, fallback to email if ID is not available
    const userId = session.user.id || session.user.email;
    if (!userId) {
      return Response.json({ error: "Unauthorized - No user identifier" }, { status: 401 });
    }
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file) {
      console.log("No file uploaded");
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { PdfReader } = require("pdfreader");

    return new Promise((resolve) => {
      const pdfReader = new PdfReader();
      let fullText = "";
      let pageCount = 0;

      pdfReader.parseBuffer(buffer, async (err, item) => {
        if (err) {
          resolve(
            Response.json({ error: "Failed to parse PDF" }, { status: 500 }),
          );
          return;
        }

        if (!item) {
          const cleanedText = fullText
            .replace(/\s+/g, " ")
            .replace(/\n+/g, "\n")
            .trim();
          
          const textCreated = await prisma.text.create({
            data: {
              text: cleanedText,
              author: {
                connect: {
                  email: userId 
                }
              },
            },
          }).catch((error) => {
            console.error("Database error:", error);
            throw error;
          });
          
          resolve(
            Response.json({
              success: true,
              pages: pageCount,
              preview: cleanedText.slice(0, 500),
              cleanedText,
              textId: textCreated.id,
            }),
          );
          return;
        }

        if (item.page) {
          pageCount++;
          console.log(`Processing page ${item.page}`);
        }

        if (item.text) {
          fullText += item.text + "\n";
        }
      });
    });
  } catch (e) {
    return Response.json(
      { error: e.message || "Failed to process PDF" },
      { status: 500 },
    );
  }
}
