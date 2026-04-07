export const runtime = "nodejs";
export async function POST(req) {
  try {
    console.log("=== PDF Processing Started ===");

    const formData = await req.formData();
    const file = formData.get("file");
    if (!file) {
      console.log("No file uploaded");
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    console.log(`File received: ${file.name} (${file.size} bytes)`);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { PdfReader } = require("pdfreader");

    return new Promise((resolve) => {
      const pdfReader = new PdfReader();
      let fullText = "";
      let pageCount = 0;

      pdfReader.parseBuffer(buffer, async (err, item) => {
        if (err) {
          console.error("PDF parsing error:", err);
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
          resolve(
            Response.json({
              success: true,
              pages: pageCount,
              preview: cleanedText.slice(0, 500),
              cleanedText,
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
    console.error("PDF processing error:", e.message);
    return Response.json(
      { error: e.message || "Failed to process PDF" },
      { status: 500 },
    );
  }
}
