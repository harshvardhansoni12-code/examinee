import { getServerSession } from "next-auth";
import { prisma } from "../../../../lib/prisma";
export async function GET(req) {
  const session = await getServerSession();
  const url = new URL(req.url);
  const contentId = url.searchParams.get("contentId");

  if (contentId) {
    const cardFound = await prisma.cards.findFirst({
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

    if (!cardFound) {
      return Response.json("card not found", { status: 400 });
    }

    return Response.json(cardFound, { status: 200 });
  }

  const cardItems = await prisma.cards.findMany({
    where: {
      author: {
        email: session.user.email,
      },
    },
    orderBy: {
      id: "desc", // latest
    },
    include: {
      text: {
        select: {
          text: true,
        },
      },
    },
  });

  if (!cardItems || cardItems.length === 0) {
    return Response.json("card not found", { status: 400 });
  }

  return Response.json(cardItems, { status: 200 });
}
