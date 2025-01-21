import { getSession } from "@/lib/auth/session";
import { handleError } from "@/utils/errorHandler";
import { generateToken } from "@/utils/token";
import { compare } from "bcrypt";
import prisma from "db/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const user = await prisma.users.findFirst({
      where: {
        username,
        deletedAt: null,
      },
      include: {
        role: true,
      },
    });

    if (!user || !(await compare(password, user.password))) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    const session = await getSession();
    session.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      role: {
        name: user.role.name,
      },
    };

    session.isLoggedIn = true;
    await session.save();

    const refreshToken = generateToken();

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    const sessionId = generateToken();

    await prisma.session.create({
      data: {
        sessionId,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Login Successfully",
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          fullName: user.fullName,
          role: user.role.name,
        },
        refreshToken,
        sessionId,
      },
    });
  } catch (error) {
    return handleError(error, "Internal server error");
  }
}
