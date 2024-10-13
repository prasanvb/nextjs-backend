import prisma from '@/lib/prisma';

// user with all posts published
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
  });

  return new Response(JSON.stringify(users), { status: 200 });
}
