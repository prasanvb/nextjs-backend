import prisma from '@/lib/prisma';

// aggregations on likeNum  from Post table
// route: api/post/aggregations

export async function GET(req: Request) {
  const aggregations = await prisma.post.aggregate({
    _sum: {
      likeNum: true,
    },
    _avg: {
      likeNum: true,
    },
    _count: {
      id: true,
    },
    _max: {
      likeNum: true,
    },
    _min: {
      likeNum: true,
    },
  });

  return new Response(JSON.stringify(aggregations), { status: 200 });
}
