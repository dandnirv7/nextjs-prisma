import {
  handleCustomError,
  handleError,
  handleValidationError,
} from "@/utils/errorHandler";
import { hashPassword } from "@/utils/hashPassword";
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
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
      },
    });

    if (!userExist) {
      return handleCustomError("User not found", 404);
    }

    return NextResponse.json(
      {
        success: true,
        data: userExist,
        message: "User retrieved successfully",
      },
      { status: 200 }
    );
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
      return handleCustomError("User not found", 404);
    }

    const body = await request.json();

    const result = UserSchema.safeParse(body);

    if (!result.success) {
      return handleValidationError(result.error);
    }

    const validateData = result.data;

    const user = await prisma.$transaction(async (prisma) => {
      const existingUser = await prisma.users.findFirst({
        where: {
          id,
          deletedAt: null,
        },
      });

      if (!existingUser) {
        throw new Error("USER_NOT_FOUND");
      }
    });

    const duplicateCheck = await prisma.users.findFirst({
      where: {
        OR: [
          { username: validateData.username },
          { email: validateData.email },
        ],
        NOT: {
          id,
        },
        deletedAt: null,
      },
    });

    if (duplicateCheck) {
      throw new Error("USERNAME_EMAIL_EXISTS");
    }

    if (validateData.password) {
      validateData.password = await hashPassword(validateData.password);
    }

    await prisma.users.update({
      where: {
        id,
      },
      data: validateData,
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: user,
        message: "User successfully update",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error && error.message === "USER_NOT_FOUND") {
      return handleCustomError("User not found", 404);
    }

    if (error instanceof Error && error.message === "USERNAME_EMAIL_EXIST") {
      return handleCustomError("Username or Email already exists", 409);
    }

    return handleError(error, "Failed to update user");
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const body = await request.json();

    if (isNaN(id)) {
      return handleCustomError("Invalid ID format", 400);
    }

    const result = UserSchema.partial().safeParse(body);

    if (!result.success) {
      return handleValidationError(result.error);
    }

    const validateData = result.data;

    const user = await prisma.$transaction(async (prisma) => {
      const existingUser = await prisma.users.findFirst({
        where: {
          id,
          deletedAt: null,
        },
      });

      if (!existingUser) {
        throw new Error("USER_NOT_FOUND");
      }
    });

    if (validateData.email || validateData.username) {
      const checkDuplicate = await prisma.users.findFirst({
        where: {
          OR: [
            validateData.email ? { email: validateData.email } : {},
            validateData.username ? { username: validateData.username } : {},
          ],
          NOT: {
            id,
          },
          deletedAt: null,
        },
      });

      if (!checkDuplicate) {
        throw new Error("USERNAME_EMAIL_EXISTS");
      }
    }

    if (validateData.password) {
      validateData.password = await hashPassword(validateData.password);
    }

    await prisma.users.update({
      where: { id },
      data: validateData,
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: user,
        message: "User updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error && error.message === "USER_NOT_FOUND") {
      return handleCustomError("User not found", 404);
    }

    if (error instanceof Error && error.message === "USERNAME_EMAIL_EXISTS") {
      return handleCustomError("Username or Email already exists", 409);
    }

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

    const user = await prisma.$transaction(async (prisma) => {
      const existingUser = await prisma.users.findUnique({
        where: { id, deletedAt: null },
      });

      if (!existingUser) {
        throw new Error("USER_NOT_FOUND");
      }
    });

    await prisma.users.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
      select: {
        email: true,
        username: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "User deleted successfully",
        data: user,
      },
      { status: 204 }
    );
  } catch (error) {
    if (error instanceof Error && error.message === "USER_NOT_FOUND") {
      return handleCustomError("User not found", 404);
    }
    return handleError(error, "Failed to delete user");
  }
}
