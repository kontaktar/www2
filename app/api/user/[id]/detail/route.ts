import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id || id === "undefined")
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const user = await prisma.userDetail.findUnique({
    where: {
      userId: id as string,
    },
  });
  if (user) {
    return NextResponse.json(user, { status: 200 });
  } else {
    return NextResponse.json(
      { error: "User detail not found" },
      { status: 404 }
    );
  }
}
