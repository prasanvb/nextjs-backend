import prisma from '@/lib/prisma';

// cursor based pagination
// route: api/post/pagination/cursor?cursor=3&pgsize=3
// NOTE: cursor id starts at 1

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const cursorId = +(searchParams.get('cursorid') ?? 0);
  const pageSize = +(searchParams.get('pgsize') ?? 4);
  console.log({ cursorId, pageSize });

  try {
    const posts = await prisma.post.findMany({
      cursor: {
        id: cursorId,
      },
      take: pageSize,
      orderBy: {
        id: 'desc',
      },
    });

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    console.error({ err });
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
