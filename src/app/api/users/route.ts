import {
  handleCustomError,
  handleError,
  handleValidationError,
} from "@/utils/errorHandler";
import { ERROR_MESSAGES } from "@/utils/errorMessage";
import { hashPassword } from "@/utils/hashPassword";
import sanitizeData from "@/utils/sanitize";
import { Prisma } from "@prisma/client";
import prisma from "db/client";
import { NextRequest, NextResponse } from "next/server";
import { UserData, UserSchema } from "schemas/userSchema";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "10", 10);
    const search = searchParams.get("search") ?? "";

    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
      return NextResponse.json(
        { success: false, error: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    const offset = (page - 1) * limit;

    const whereCondition: Prisma.UsersWhereInput = {
      deletedAt: null,
      fullName: search
        ? {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          }
        : undefined,
    };

    const users = await prisma.users.findMany({
      where: whereCondition,
      select: {
        id: true,
        email: true,
        username: true,
        fullName: true,
        role: true,
        status: true,
      },
      skip: offset,
      take: limit,
      orderBy: { deletedAt: "desc" },
    });

    const totalUsers = await prisma.users.count({ where: whereCondition });

    return NextResponse.json(
      {
        success: true,
        data: {
          total_users: totalUsers,
          total_pages: Math.ceil(totalUsers / limit),
          page,
          limit,
          users,
        },
        message: "Users retrieved successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/users:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve users" },
      { status: 500 }
    );
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
      data: {
        ...validatedData,
        role: "user",
        status: "active",
      },
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
