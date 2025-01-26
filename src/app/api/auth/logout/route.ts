import { destroySession } from "@/lib/auth/session";
import { handleCustomError, handleError } from "@/utils/errorHandler";
import { ERROR_MESSAGES } from "@/utils/errorMessage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return handleCustomError(ERROR_MESSAGES.METHOD_NOT_ALLOWED, 405);
  }

  try {
    await destroySession();
    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    return handleError(error, ERROR_MESSAGES.LOGOUT_INTERNAL_ERROR);
  }
}
