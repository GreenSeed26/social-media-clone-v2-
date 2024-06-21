import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { nametag: string } },
) {
  const { nametag } = params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        nametag,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { nametag: string } },
) {
  const id = params.nametag;

  const { fullName, nametag, image, bio, followCount } = await req.json();
  try {
    const user = await prisma.user.update({
      where: {
        nametag: id,
      },
      data: {
        fullName,
        nametag,
        image,
        bio,  
        followCount,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
