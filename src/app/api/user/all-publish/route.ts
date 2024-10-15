import prisma from '@/lib/prisma';

// user with all posts published
// select query
// route: api/user/all-published
export async function GET(_req: Request) {
  try {
    const users = await prisma.user.findMany({
      where: {
        posts: {
          every: {
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
