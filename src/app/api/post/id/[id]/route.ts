import prisma from '@/lib/prisma';

export interface paramType {
  params: { id: string };
}

// route: api/post/id/1
export async function GET(req: Request, { params }: paramType) {
  const id: number = parseInt(params.id);
  console.log({ id });
  const posts = await prisma.post.findMany({
    where: {
      id: {
        in: [id],
      },
    },
  });

  return new Response(JSON.stringify(posts), { status: 200 });
}
