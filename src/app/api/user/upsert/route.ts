import prisma from '@/lib/prisma';

// route: api/user/create
// payload: {"name":"Venkat","email":"venkat@gmail.com","role":"ADMIN"}
// where condition has to be an index

export async function PUT(req: Request) {
  const body = await req.json();
  console.log(body);

    const newUser = await prisma.user.upsert({
        where:{
            // where condition has to be an index
            email: body.email,
        }, 
        update:{
            name: body.name,
            email: body.email,
            role: body.role,
          },
          create:{
            name: body.name,
            email: body.email,
            role: body.role,
          }
      });
    
      return new Response(JSON.stringify(newUser), { status: 200 });
 }
  
