import prisma from '@/lib/prisma';

// cursor based pagination
// route: api/post/pagination/cursor?cursor=3&pgsize=3
// NOTE: cursor id starts at 1

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const cursorid = +(searchParams.get('cursorid') ?? 0);
  const pgsize = +(searchParams.get('pgsize') ?? 4);
  console.log({ cursorid, pgsize });

  const posts = await prisma.post.findMany({
    cursor: {
      id: cursorid,
    },
    take: pgsize,
    orderBy: {
      id: 'desc',
    },
  });

  return new Response(JSON.stringify(posts), { status: 200 });
}
