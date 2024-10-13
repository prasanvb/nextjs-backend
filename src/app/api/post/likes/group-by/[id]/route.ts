import prisma from '@/lib/prisma';

export interface paramType {
  params: { id: string };
}

// aggregations on likeNum from Post table grouped by authorId
// route: api/post/likes/group-by/1,3

export async function GET(req: Request, { params }: paramType) {
  const idList = params.id.split(',').map((id) => parseInt(id));

  const groupPosts = await prisma.post.groupBy({
    by: ['authorId'],
    _sum: {
      likeNum: true,
    },
    _avg: {
      likeNum: true,
    },
    _count: {
      likeNum: true,
    },
    where: {
      authorId: {
        in: idList,
      },
    },
  });

  return new Response(JSON.stringify(groupPosts));
}
