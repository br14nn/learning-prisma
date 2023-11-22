import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id") as string;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        profile: true,
      },
    });

    return NextResponse.json({ data: user, ok: true });
  } catch (error) {
    return NextResponse.json({ message: "Find user failed", ok: false });
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    await prisma.user.create({
      data: {
        email: data.email,
        profile: {
          create: {
            name: data.name,
            age: data.age,
            gender: data.gender as "FEMALE" | "MALE",
          },
        },
      },
    });

    return NextResponse.json({ message: "Created user successfully", ok: true });
  } catch (error) {
    return NextResponse.json({ message: "Create user failed", ok: false });
  }
}
