export const runtime = "nodejs";

import { getServerSession } from "next-auth";
import { extractAndStoreText } from "@/lib/pdfService";

export async function POST(req) {
  try {
    const session = getServerSession();
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
    const { textId } = await extractAndStoreText(buffer, userId);
    const textFounded = await prisma.text.findUnique({
      where: { id: textId },
    });
    const text = textFounded.text;
    console.log(`${text}`);
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: e.message || "Failed to process PDF" },
      { status: 500 },
    );
  }
}
