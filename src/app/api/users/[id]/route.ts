import {
  handleCustomError,
  handleError,
  handleValidationError,
} from "@/utils/errorHandler";
import prisma from "db/client";
import { NextResponse } from "next/server";
import { UserSchema } from "schemas/userSchema";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (isNaN(id)) {
      return handleCustomError("Invalid ID format", 400);
    }

    const userExist = await prisma.users.findUnique({
      where: {
        id: id,
      },
      omit: {
        roleId: true,
        password: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });

    if (!userExist) {
      return handleCustomError("User not found", 400);
    }

    return NextResponse.json(userExist, { status: 200 });
  } catch (error) {
    return handleError(error, "Failed to proccess request");
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (isNaN(id)) {
      return handleCustomError("Invalid ID format", 400);
    }

    const userExist = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });

    if (!userExist) {
      return handleCustomError("User not found", 400);
    }

    const body = await request.json();

    const result = UserSchema.safeParse(body);

    if (!result.success) {
      return handleValidationError(result.error);
    }

    const validateData = result.data;

    const user = await prisma.users.update({
      where: {
        id,
      },
      data: validateData,
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return handleError(error, "Failed to update user");
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (isNaN(id)) {
      return handleCustomError("Invalid ID format", 400);
    }

    const userExist = await prisma.users.findUnique({
      where: { id },
    });

    if (!userExist) {
      return handleCustomError("User not found", 404);
    }

    const user = await prisma.users.delete({
      where: { id },
      select: {
        email: true,
        username: true,
      },
    });

    return NextResponse.json(
      { message: "User deleted successfully", user },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "Failed to delete user");
  }
}
