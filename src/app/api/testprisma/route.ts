import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/db';

export async function GET() {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json({
      data: users,
      ok: true,
    });
  } catch (error) {
    console.error(error);
  }
}
