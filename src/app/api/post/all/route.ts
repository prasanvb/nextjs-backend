import prisma from '@/lib/prisma';

// route: api/post/all
export async function GET(req: Request) {
  const posts = await prisma.post.findMany();

  return new Response(JSON.stringify(posts), { status: 200 });
}
