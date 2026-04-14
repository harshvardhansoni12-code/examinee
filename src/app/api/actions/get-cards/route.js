import { getServerSession } from "next-auth";
import { prisma } from "../../../../lib/prisma";
export async function GET(req) {
  const session = await getServerSession();

  const cardFound = await prisma.cards.findFirst({
    where: {
      author: {
        email: session.user.email,
      },
    },
    orderBy: {
      id: "desc", // latest
    },
  });
  if (!cardFound) {
    return Response.json("card not found", { status: 400 });
  }
  return Response.json([cardFound], { status: 200 });
}
