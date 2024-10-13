import prisma from '@/lib/prisma';
import { type NextRequest } from 'next/server';

// api/post/filter?title=github&title=Twitter&published=true
// title 1 is case insensiteive and title 2 is case sensitive

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.getAll('title');
  const published = searchParams.get('published');

  console.log({ title, published });

  const posts = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: title[0],
            mode: 'insensitive',
          },
        },
        {
          title: {
            contains: title[1],
            mode: 'default',
          },
        },
      ],
      AND: {
        published: published && JSON.parse(published.toLowerCase()),
      },
    },
  });


  return new Response(JSON.stringify(posts), { status: 200 });
}
