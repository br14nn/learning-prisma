import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId") as string;

  try {
    const userProfile = await prisma.profile.findUnique({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json({ data: userProfile, ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false });
  }
}
