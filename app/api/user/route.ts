import { NextResponse } from "next/server";
import { hash } from "bcrypt-ts";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const user = await prisma.user.findMany({
      orderBy: { joinedAt: "desc" },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { email, fullName, nametag, password } = await req.json();

    const hashPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        fullName,
        nametag,
        password: hashPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
