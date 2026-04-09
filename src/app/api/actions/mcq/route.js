export const runtime = "nodejs";

import { getServerSession } from "next-auth";
import { extractAndStoreText } from "../../../../lib/pdfService";
import { getText } from "../../../../lib/getText";
//import { prisma } from "../../../../lib/prisma";
export async function POST(req) {
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
    const { textId } = await extractAndStoreText(buffer, userId);
    const { text } = await getText({ textId });
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
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: e.message || "Failed to process PDF" },
      { status: 500 },
    );
  }
}
