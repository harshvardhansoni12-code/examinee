import { getServerSession } from "next-auth";
import { prisma } from "../../../../lib/prisma";
export async function GET(req) {
  const session = await getServerSession();
  const url = new URL(req.url);
  const contentId = url.searchParams.get("contentId");

  if (contentId) {
    const mcqFound = await prisma.mcq.findFirst({
      where: {
        id: Number(contentId),
        author: {
          email: session.user.email,
        },
      },
      include: {
        text: {
          select: {
            text: true,
          },
        },
      },
    });

    if (!mcqFound) {
      return Response.json("mcq not found", { status: 400 });
    }

    return Response.json(mcqFound, { status: 200 });
  }

  const mcqItems = await prisma.mcq.findMany({
    where: {
      author: {
        email: session.user.email,
      },
    },
    orderBy: {
      id: "desc",
    },
    include: {
      text: {
        select: {
          text: true,
        },
      },
    },
  });

  if (!mcqItems || mcqItems.length === 0) {
    return Response.json("mcq not found", { status: 400 });
  }

  return Response.json(mcqItems, { status: 200 });
}
