import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      role: body.role,
    },
  });

  return new Response(JSON.stringify(newUser), { status: 200 });
}
