import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


// route: api/post/transaction
// payload: {"senderPostId":8,"receiverPostId":7,"transferNumber":20}

export async function POST(req: NextRequest) {
  try{
    const body = await req.json();
    const senderUpdate = prisma.post.update({
      where: {
        id: body.senderPostId,
      },
      data: {
        likeNum:{
            decrement: body.transferNumber
        }
      },
    });
    const receiverUpdate = prisma.post.update({
        where: {
          id: body.receiverPostId,
        },
        data: {
          likeNum:{
              increment: body.transferNumber
          }
        },
      });
  
    const result = await prisma.$transaction([senderUpdate, receiverUpdate])
    return NextResponse.json(result, { status: 200 });      
  }
  catch(err){
    console.error({err})
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
