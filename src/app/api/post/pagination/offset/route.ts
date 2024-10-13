import prisma from '@/lib/prisma';

// Offset based pagination
// route: api/post/pagination/offset?pgnum=0&pgsize=2
// NOTE: page number starts at 0

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const pgnum = +(searchParams.get('pgnum') ?? 0);
  const pgsize = +(searchParams.get('pgsize') ?? 3);

  console.log({ pgnum, pgsize });

  const posts = await prisma.post.findMany({
    skip: pgnum * pgsize,
    take: pgsize,
    orderBy: {
      likeNum: 'desc',
    },
    where: {
      author: {
        email: {
          contains: 'prisma.io',
        },
      },
    },
  });

  return new Response(JSON.stringify(posts), { status: 200 });
}
