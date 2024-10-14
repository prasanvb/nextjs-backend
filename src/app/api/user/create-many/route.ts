import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();
  console.log([...body]);

  const newUsers = await prisma.user.createMany({
    data: body,
    skipDuplicates: true,
  });

  return new Response(JSON.stringify(newUsers), { status: 200 });
}
