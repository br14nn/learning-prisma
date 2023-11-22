import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = (await req.json()) as { username: string; name: string };

  try {
    await prisma.user.create({
      data: {
        username: data.username,
        name: data.name,
      },
    });

    return NextResponse.json({ message: "Created user successfully", ok: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Failed to create user", ok: false });
  }
}
