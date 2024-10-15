import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export interface paramType {
  params: { id: string };
}

// route: api/user/update/roles/name?contains=p
// payload: { "role": "ADMIN" }
export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const value = searchParams.get('contains');
  const body = await req.json();

  console.log(value?.toString());

  const updatedRoles = await prisma.user.updateMany({
    where: {
      name: {
        contains: value ? value : undefined,
      },
    },
    data: {
      role: body.role,
    },
  });

  return NextResponse.json(updatedRoles, { status: 200 });
}
