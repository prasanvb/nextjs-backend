import prisma from '@/lib/prisma';
import { type NextRequest } from 'next/server';
import { title } from 'process';

// name key value is case sensitive
// email - endsWith = '.com'
// route: api/post/name?equal=Jack - uses include
// route: api/post/name?not-equal=Jack - uses nested select

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const nameEqual = searchParams.get('equal');
  const nameNotEqual = searchParams.get('not-equal');

  try {
    const posts = nameEqual
      ? await prisma.post.findMany({
          where: {
            author: {
              is: {
                name: nameEqual ? nameEqual : undefined,
                email: {
                  endsWith: '.com',
                },
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
                is: {
                  email: {
                    endsWith: '.com',
                  },
                },
              },
            },
            select: {
              title: true,
              author: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          })
        : [];

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    console.error({ err });
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
