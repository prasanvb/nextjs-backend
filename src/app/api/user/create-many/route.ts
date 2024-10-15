import prisma from '@/lib/prisma';

// route: api/user/create-many
// payload: [{"name":"p1","email":"p1@gmail.com"},{"name":"p2","email":"p2@gmail.com"}]

export async function POST(req: Request) {
  const body = await req.json();
  console.log([...body]);

  const newUsers = await prisma.user.createMany({
    data: body,
    skipDuplicates: true,
  });

  return new Response(JSON.stringify(newUsers), { status: 200 });
}
