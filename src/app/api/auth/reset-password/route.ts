import { comparePassword } from "@/utils/comparePassword";
import { handleCustomError, handleError } from "@/utils/errorHandler";
import { ERROR_MESSAGES } from "@/utils/errorMessage";
import { hashPassword } from "@/utils/hashPassword";
import prisma from "db/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return handleCustomError(ERROR_MESSAGES.METHOD_NOT_ALLOWED, 405);
  }

  try {
    const body = await request.json();
    const { token, password } = body;

    if (!token || !password) {
      return handleCustomError(ERROR_MESSAGES.MISSING_TOKEN_OR_PASSWORD, 400);
    }

    const user = await prisma.users.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      return handleCustomError(ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN, 400);
    }

    const isSamePassword = await comparePassword(password, user.password);

    if (isSamePassword) {
      return NextResponse.json(
        { message: ERROR_MESSAGES.SAME_PASSWORD },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    return handleError(error, ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
}
