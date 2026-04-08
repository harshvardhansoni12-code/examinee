import { prisma } from "./prisma";
import { PdfReader } from "pdfreader";

export const extractAndStoreText = async (buffer, userId) => {
  return new Promise((resolve, reject) => {
    const pdfReader = new PdfReader();
    let fullText = "";
    let pageCount = 0;

    pdfReader.parseBuffer(buffer, async (err, item) => {
      if (err) {
        return reject(new Error("Failed to parse PDF"));
      }

      if (!item) {
        try {
          const cleanedText = fullText
            .replace(/\s+/g, " ")
            .replace(/\n+/g, "\n")
            .trim();

          const textCreated = await prisma.text.create({
            data: {
              text: cleanedText,
              author: {
                connect: {
                  email: userId, // change to id if needed
                },
              },
            },
          });

          return resolve({
            success: true,
            textId: textCreated.id,
            pages: pageCount,
            preview: cleanedText.slice(0, 300),
          });
        } catch (dbError) {
          return reject(dbError);
        }
      }

      if (item.page) pageCount++;

      if (item.text) {
        fullText += item.text + "\n";
      }
    });
  });
};
