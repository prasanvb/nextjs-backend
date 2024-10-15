import prisma from '@/lib/prisma';

// route: api/post/all

export async function GET(req: Request) {
  try {
    const posts = await prisma.post.findMany();

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    console.error({ err });
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
