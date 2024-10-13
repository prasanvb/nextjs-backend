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

export async function GET(req: Request, { params }: paramType) {
  console.log(params.order);

  const postsLikesByOrder = await prisma.post.findMany({
    orderBy: {
      likeNum: params.order,
    },
  });

  return new Response(JSON.stringify(postsLikesByOrder));
}
