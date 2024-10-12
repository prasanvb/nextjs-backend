import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.method, res);

  const posts = await prisma.post.findMany();
  console.log(JSON.stringify(posts));

  return new Response(JSON.stringify(posts), { status: 200 });
}
