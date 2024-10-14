import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export interface paramType {
  params: { id: string };
}

// reoute: api/user/delete/7
export async function DELETE(request: NextRequest, { params }: paramType) {
  const id = parseInt(params.id);

  const deleteUser = await prisma.user.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json(deleteUser, { status: 200 });
}
