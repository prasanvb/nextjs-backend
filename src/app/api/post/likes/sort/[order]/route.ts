import prisma from '@/lib/prisma';

enum sortingOrder {
  desc = 'desc',
  asc = 'asc',
}

export interface paramType {
  params: { order: sortingOrder };
}

// sort by likeNum from Post table
// route: api/post/likes/sort/asc
//        api/post/likes/sort/desc

export async function GET(_req: Request, { params }: paramType) {
  try {
    const postsLikesByOrder = await prisma.post.findMany({
      orderBy: {
        likeNum: params.order,
      },
    });

    return new Response(JSON.stringify(postsLikesByOrder));
  } catch (err) {
    console.error({ err });
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
