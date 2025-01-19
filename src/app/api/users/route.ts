import {
  handleCustomError,
  handleError,
  handleValidationError,
} from "@/utils/errorHandler";
import { hashPassword } from "@/utils/hashPassword";
import prisma from "db/client";
import { NextResponse } from "next/server";
import { UserSchema } from "schemas/userSchema";

export async function GET() {
  try {
    const users = await prisma.users.findMany({
      where: {
        deletedAt: null,
      },
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
        data: users,
        message: "Users retrieved successfully",
      },
      { status: 200 }
    );
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

    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [
          {
            username: validateData.username,
          },
          {
            email: validateData.username,
          },
        ],
        deletedAt: null,
      },
    });

    if (existingUser) {
      throw new Error("USERNAME_EMAIL_EXISTS");
    }

    if (validateData.password) {
      validateData.password = await hashPassword(validateData.password);
    }

    const user = await prisma.users.create({
      data: validateData,
      select: {
        id: true,
        username: true,
        fullName: true,
        email: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: user,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error && error.message === "USERNAME_EMAIL_EXISTS") {
      return handleCustomError("Username or Email already exists", 409);
    }
    return handleError(error, "Error creating user");
  }
}
