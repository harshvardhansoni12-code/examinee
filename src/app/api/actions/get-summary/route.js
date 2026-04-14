import { getServerSession } from "next-auth";
import { prisma } from "../../../../lib/prisma";
export async function GET(req) {
  const session = await getServerSession();

  const summaryFound = await prisma.summary.findFirst({
    where: {
      author: {
        email: session.user.email,
      },
    },
    orderBy: {
      id: "desc",
    },
  });
  if (!summaryFound) {
    return Response.json("summary not found", { status: 400 });
  }
  return Response.json([summaryFound], { status: 200 });
}
