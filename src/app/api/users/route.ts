import { handleError, handleValidationError } from "@/utils/errorHandler";
import prisma from "db/client";
import { NextResponse } from "next/server";
import { UserSchema } from "schemas/userSchema";

export async function GET() {
  try {
    const users = await prisma.users.findMany({
      where: {
        roleId: {
          not: 1,
        },
      },
      omit: {
        roleId: true,
        password: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return handleError(error, "Failed to proccess request");
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = UserSchema.safeParse(body);

    if (!result.success) {
      return handleValidationError(result.error);
    }

    const validateData = result.data;

    const user = await prisma.users.create({ data: validateData });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return handleError(error, "Error creating user");
  }
}
