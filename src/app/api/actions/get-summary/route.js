import { getServerSession } from "next-auth";
import { prisma } from "../../../../lib/prisma";
export async function GET(req) {
  const session = await getServerSession();
  const url = new URL(req.url);
  const contentId = url.searchParams.get("contentId");

  if (contentId) {
    const summaryFound = await prisma.summary.findFirst({
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

    if (!summaryFound) {
      return Response.json("summary not found", { status: 400 });
    }

    return Response.json(summaryFound, { status: 200 });
  }

  const summaryItems = await prisma.summary.findMany({
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

  if (!summaryItems || summaryItems.length === 0) {
    return Response.json("summary not found", { status: 400 });
  }

  return Response.json(summaryItems, { status: 200 });
}
