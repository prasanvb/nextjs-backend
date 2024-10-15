import prisma from '@/lib/prisma';

export interface paramType {
  params: { id: string };
}

// route: api/post/id/1
// route: api/post/id/1,2,3

export async function GET(req: Request, { params }: paramType) {
  const idList = params.id.split(',').map((id) => parseInt(id));

  if (idList.length === 1) {
    try {
      const posts = await prisma.post.findUnique({
        where: {
          id: idList[0],
        },
      });

      return new Response(JSON.stringify(posts), { status: 200 });
    } catch (err) {
      console.error({ err });
      return new Response(JSON.stringify(err), { status: 500 });
    }
  }

  try {
    const posts = await prisma.post.findMany({
      where: {
        id: {
          in: [...idList],
        },
      },
    });

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    console.error({ err });
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
