import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const users = await prisma.user.findMany();
  if (users) {
    return NextResponse.json(users);
  } else {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}
