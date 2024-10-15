import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export interface paramType {
  params: { id: string };
}

// route: api/user/update/7
// payload: { "name": "prasan", "email": "prasan@gmail.com" }

export async function PATCH(req: NextRequest, { params }: paramType) {
  const id = parseInt(params.id);

  try{
    const body = await req.json();
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: body.name,
        email: body.email
      },
    });
  
    return NextResponse.json(updatedUser, { status: 200 });      
  }
  catch(err){
    console.error({err})
    return new Response(JSON.stringify(err), { status: 500 });
  }

}
