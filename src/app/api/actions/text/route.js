export const runtime = "nodejs";

export async function POST(req) {
  try {
    console.log("=== PDF Processing Started ===");

    const formData = await req.formData();
    const file = formData.get("file");
    if (!file) {
      console.log(" No file uploaded");
      return Response.json({ error: "no file uploaded" }, { status: 400 });
    }

    console.log(` File received: ${file.name} (${file.size} bytes)`);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Use pdfreader
    const { PdfReader } = require("pdfreader");

    return new Promise((resolve, reject) => {
      const pdfReader = new PdfReader();
      let fullText = "";
      let pageCount = 0;

      pdfReader.parseBuffer(buffer, (err, item) => {
        if (err) {
          console.error(" PDF parsing error:", err);
          resolve(
            Response.json({ error: "Failed to parse PDF" }, { status: 500 }),
          );
          return;
        }

        if (!item) {
          // End of document

          resolve(
            Response.json({
              success: true,
              pages: pageCount,
              preview: fullText.slice(0, 500),
              fullText: fullText,
            }),
          );
          return;
        }

        if (item.page) {
          pageCount++;
          console.log(` Processing page ${item.page}`);
        }

        if (!item.text) {
          return Response.json("Error processing text", { status: 500 });
        }
        fullText += item.text + " ";
        console.log(` Text extracted: "${item.text.substring(0, 50)}..."`);
      });
    });
  } catch (e) {
    console.error(" PDF processing error:", e);
    console.error(" Error details:", e.message);
    console.log("=== PDF Processing Failed ===");
    return Response.json(
      { error: e.message || "Failed to process PDF" },
      { status: 500 },
    );
  }
}
