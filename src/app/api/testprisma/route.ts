import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/db';

export async function GET() {
  try {
    //NESTED QUERIES WITH PRISMA
    const users = await prisma.user.findMany({
      include: {
        writtenPosts: {
          include: {
            categories: true,
          },
        },
      },
    });

    const createPost = await prisma.post.create({
      data: {
        title: 'First Post Of John Doe',
        author: {
          connect: {
            id: 'ee834f73-549e-4813-820e-584544c5185c',
          },
        },
      },
    });

    return NextResponse.json({
      data: users,
      ok: true,
    });
  } catch (error) {
    console.error(error);
  }
}
