import { handleCustomError, handleError } from "@/utils/errorHandler";
import { ERROR_MESSAGES } from "@/utils/errorMessage";
import prisma from "db/client";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { isEmail } from "validator";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return handleCustomError(ERROR_MESSAGES.METHOD_NOT_ALLOWED, 405);
  }

  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !isEmail(email)) {
      return handleCustomError(ERROR_MESSAGES.INVALID_EMAIL, 400);
    }

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return handleCustomError(ERROR_MESSAGES.USER_NOT_FOUND, 404);
    }

    const resetToken = uuidv4();
    const expirationTime = new Date(Date.now() + 3600000);

    await prisma.users.update({
      where: {
        email,
      },
      data: {
        resetToken,
        resetTokenExpires: expirationTime,
      },
    });

    const baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.BASE_URL_PROD
        : process.env.BASE_URL_DEV;

    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST!,
      port: parseInt(process.env.MAILTRAP_PORT!, 10),
      auth: {
        user: process.env.MAILTRAP_USER!,
        pass: process.env.MAILTRAP_PASS!,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER!,
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>You requested a password reset</p>
        <p>Click <a href="${baseUrl}/reset-password/${resetToken}">here</a> to reset your password</p>
        <p>This link will expire in 1 hour</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Reset token generated and email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
}
