import { getServerSession } from "next-auth";
import { prisma } from "../../../../lib/prisma";
export async function GET(req) {
  const session = await getServerSession();

  const mcqFound = await prisma.mcq.findFirst({
    where: {
      author: {
        email: session.user.email,
      },
    },
    orderBy: {
      id: "desc", // latest
    },
  });
  if (!mcqFound) {
    return Response.json("mcq not found", { status: 400 });
  }
  return Response.json([mcqFound], { status: 200 });
}
