import prisma from '@/lib/prisma';

// route: api/user/create-many
// payload: [{"name":"p1","email":"p1@gmail.com"},{"name":"p2","email":"p2@gmail.com"}]

export async function POST(req: Request) {

  try{
    const body = await req.json();
    const newUsers = await prisma.user.createMany({
      data: body,
      skipDuplicates: true,
    });
  
    return new Response(JSON.stringify(newUsers), { status: 200 });   
  }
  catch(err){
    console.error({err})
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
