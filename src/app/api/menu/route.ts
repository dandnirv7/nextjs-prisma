import { handleError, handleValidationError } from "@/utils/errorHandler";
import prisma from "db/client";
import { NextResponse } from "next/server";
import { FormSchema } from "schemas/formSchema";

export async function GET() {
  try {
    const menu = await prisma.menu.findMany();

    return NextResponse.json(menu);
  } catch (error) {
    return handleError(error, "Failed to proccess request");
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = FormSchema.safeParse(body);

    if (!result.success) {
      return handleValidationError(result.error);
    }

    const validateData = result.data;

    const menu = await prisma.menu.create({ data: validateData });

    return NextResponse.json(menu, { status: 201 });
  } catch (error) {
    return handleError(error, "Error creating menu");
  }
}
