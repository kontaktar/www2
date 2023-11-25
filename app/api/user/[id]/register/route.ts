import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id || id === "undefined")
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const body = await req.json();
  try {
    const user = await prisma.userDetail.create({
      data: {
        userName: body.userName,
        firstName: body.firstName,
        lastName: body.lastName,
        phoneNumber: body.phoneNumber,
        ssn: body.ssn,
        postalCode: body.postalCode,
        streetName: body.address,
        user: {
          connect: {
            id: id,
          },
        },
      },
    });

    await prisma.userStatistics.create({
      data: {
        user: {
          connect: {
            id: id,
          },
        },
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      (error.code === "P2014" || error.code === "P2011")
    ) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    } else {
      // handle other types of errors
      return NextResponse.json(
        { error: "An error occurred while creating the user" },
        { status: 500 }
      );
    }
  }
}
