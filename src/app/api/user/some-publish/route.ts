import prisma from '@/lib/prisma';

// user with some posts published
// route: api/user/some-publish

export async function GET(_req: Request) {
  try {
    const users = await prisma.user.findMany({
      where: {
        posts: {
          some: {
            published: true,
          },
        },
      },
      select: {
        email: true,
        name: true,
        // show max 5 posts
        posts: {
          take: 5,
        },
      },
    });

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (err) {
    console.error({ err });
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
