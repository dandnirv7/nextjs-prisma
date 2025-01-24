import {
  handleCustomError,
  handleError,
  handleValidationError,
} from "@/utils/errorHandler";
import { ERROR_MESSAGES } from "@/utils/errorMessage";
import { hashPassword } from "@/utils/hashPassword";
import sanitizeData from "@/utils/sanitize";
import { userSelect } from "@/utils/selectOptions";
import prisma from "db/client";
import { NextResponse } from "next/server";
import { UserData, UserSchema } from "schemas/userSchema";

export async function GET() {
  try {
    const users = await prisma.users.findMany({
      where: {
        deletedAt: null,
      },
      select: userSelect,
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
    return handleError(error, ERROR_MESSAGES.PROCESS_FAILED);
  }
}

export async function POST(request: Request) {
  try {
    const body: UserData = await request.json();
    const validatedData = sanitizeData(body, UserSchema);

    const result = UserSchema.safeParse(validatedData);

    if (!result.success) {
      return handleValidationError(result.error);
    }

    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [
          {
            username: validatedData.username,
          },
          {
            email: validatedData.email,
          },
        ],
        deletedAt: null,
      },
    });

    if (existingUser) {
      return handleCustomError(ERROR_MESSAGES.USERNAME_EMAIL_EXISTS, 409);
    }

    if (validatedData.password) {
      validatedData.password = await hashPassword(validatedData.password);
    }

    const user = await prisma.users.create({
      data: validatedData,
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
    return handleError(error, ERROR_MESSAGES.CREATE_FAILED);
  }
}
