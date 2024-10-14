import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export interface paramType {
  params: { id: string };
}

// route: api/user/update/7
// payload: { "name": "pras" }
export async function PATCH(req: NextRequest, { params }: paramType) {
  const id = parseInt(params.id);
  const body = await req.json();
  console.log(body);

  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: body.name,
    },
  });

  return NextResponse.json(updatedUser, { status: 200 });
}
