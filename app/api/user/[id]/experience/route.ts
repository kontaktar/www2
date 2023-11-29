import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id || id === "undefined")
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const user = await prisma.experience.findMany({
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
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id || id === "undefined")
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const body = await req.json();
  try {
    const experience = await prisma.experience.create({
      data: {
        years: body?.years,
        months: body?.months,
        order: body?.order,
        title: body.title,
        description: body.description,
        published: body.published,
        user: {
          connect: {
            id: id,
          },
        },
      },
    });

    return NextResponse.json(experience, { status: 200 });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "An error occurred while creating." },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "An error occurred while creating." },
      { status: 500 }
    );
  }
}
