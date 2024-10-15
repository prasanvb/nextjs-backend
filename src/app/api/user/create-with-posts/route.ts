import prisma from '@/lib/prisma';

// route: api/user/create-with-posts
// payload: {"name":"Prasan","email":"prasan+9@gmail.com","role":"USER","posts":[{"title":"Learn about Prisma on Udemy","published":false,"likeNum":77,"catgories":[{"id":3}]}]}

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  try{
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
  catch(err){
    console.error({err})
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
