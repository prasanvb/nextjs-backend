import prisma from '@/lib/prisma';

// user with all posts published
// select query
// route: api/user/all-published
export async function GET(req: Request) {
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
}
