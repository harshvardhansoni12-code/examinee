import { getServerSession } from "next-auth";
export default async function GET(req) {
  const session = getServerSession();

  const mcqFound = await prisma.mcq.findFirst({
    where: {
      id: Number(id),
      author: {
        connect: {
          email: session.user.email,
        },
      },
      text: {
        connect: {
          id: textId,
        },
      },
      orderBy: {
        id: "desc", // latest
      },
    },
  });
  if (!mcqFound) {
    return Response.json("mcq not found", { status: 400 });
  }
  return Response.json({ id: mcqFound.id, mcq: mcqFound.mcq }, { status: 200 });
}
