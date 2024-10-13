import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      role: body.role,
      posts: {
        create: [
          {
            title: body.posts[0].title,
            published: body.posts[0].published,
            likeNum: body.posts[0].likeNum,
            catgories: {
              connectOrCreate: {
                where: {
                  id: body.posts[0].catgories[0].id,
                },
                create: {
                  name: 'Data Lake',
                },
              },
            },
          },
        ],
      },
    },
  });

  return new Response(JSON.stringify(newUser), { status: 200 });
}
