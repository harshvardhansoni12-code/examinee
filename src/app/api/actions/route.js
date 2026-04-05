async function POST(req) {
  const body = await req.json();
  const pdfCreated = await prisma.pdf.create({
    pdf: body.pdf,
  });
  if (pdfCreated) {
    return Response.json("pdf created", { status: 201 });
  }
}
