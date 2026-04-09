import { prisma } from "./prisma";
export const getText = async ({ textId }) => {
  try {
    const textFounded = await prisma.text.findUnique({
      where: { id: textId },
    });
    if (!textFounded) {
      return Response.json({ error: "Text not found" }, { status: 404 });
    }
    const text = textFounded.text;
    console.log(text);
    return Response.json({
      success: true,
      text,
      preview: text.slice(0, 300),
    });
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: e.message || "Failed to process PDF" },
      { status: 500 },
    );
  }
};
