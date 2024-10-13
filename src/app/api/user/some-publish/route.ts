import prisma from '@/lib/prisma';

// user with some posts published
// route: api/user/some-publish
export async function GET(req: Request) {
  const users = await prisma.user.findMany({
    where: {
      posts: {
        some: {
          published: true,
        },
      },
    },
  });

  return new Response(JSON.stringify(users), { status: 200 });
}
