import prisma from '@/lib/prisma';
import { type NextRequest } from 'next/server';

// api/post/name?equal=Jack
// api/post/name?not-equal=Jack
// name value is case sensitive

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const nameEqual = searchParams.get('equal');
  const nameNotEqual = searchParams.get('not-equal');

  console.log({ nameEqual, nameNotEqual });

  const posts = nameEqual
    ? await prisma.post.findMany({
        where: {
          author: {
            is: {
              name: nameEqual ? nameEqual : undefined,
            },
          },
        },
        include: {
          author: true,
        },
      })
    : nameNotEqual
      ? await prisma.post.findMany({
          where: {
            author: {
              isNot: {
                name: nameNotEqual ? nameNotEqual : undefined,
              },
            },
          },
          include: {
            author: true,
          },
        })
      : [];

  return new Response(JSON.stringify(posts), { status: 200 });
}
