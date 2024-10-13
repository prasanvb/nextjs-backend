import prisma from '@/lib/prisma';

// user with none posts published
// route: api/user/none-publish
export async function GET(req: Request) {
  const users = await prisma.user.findMany({
    where: {
      posts: {
        none: {
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
}
