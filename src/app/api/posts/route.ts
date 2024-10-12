import { NextRequest, NextResponse } from 'next/server';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export interface ResponseData {
  message: string;
}

export async function GET(req: NextApiRequest, res: NextResponse) {
  console.log(req.method);

  const posts = await prisma.post.findMany();
  console.log(JSON.stringify(posts));

  return NextResponse.json({ posts: JSON.stringify(posts) }, { status: 200 });
}

export async function POST(req: NextRequest) {
  return NextResponse.json(
    { message: 'This is a post request' },
    { status: 200 },
  );
}

export async function PATCH(req: NextRequest) {
  return NextResponse.json(
    { message: 'This is a patch request' },
    { status: 200 },
  );
}
