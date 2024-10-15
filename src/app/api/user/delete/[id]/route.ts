import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export interface paramType {
  params: { id: string };
}

// route: api/user/delete/7

export async function DELETE(request: NextRequest, { params }: paramType) {
  try{
    const deleteUser = await prisma.user.delete({
      where: {
        id: parseInt(params.id),
      },
    });
  
    return NextResponse.json(deleteUser, { status: 200 });   
  }
  catch(err){
    console.error({err})
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
