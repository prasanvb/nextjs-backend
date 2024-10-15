import prisma from '@/lib/prisma';

// aggregations on likeNum  from Post table
// route: api/post/aggregations

export async function GET(_req: Request) {
  try {
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
  } catch (err) {
    console.error({ err });
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
