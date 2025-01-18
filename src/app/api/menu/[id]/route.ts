import { NextResponse } from "next/server";
import prisma from "db/client";
import { FormSchema } from "schemas/formSchema";
import {
  handleCustomError,
  handleError,
  handleValidationError,
} from "@/utils/errorHandler";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (isNaN(id)) {
      return handleCustomError("Invalid ID format", 400);
    }

    const menuExist = await prisma.menu.findUnique({
      where: { id },
    });

    if (!menuExist) {
      return handleCustomError("Menu not found", 404);
    }

    return NextResponse.json(menuExist, { status: 200 });
  } catch (error) {
    return handleError(error, "Failed to fetch menu");
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

    const body = await request.json();

    const result = FormSchema.safeParse(body);

    if (!result.success) {
      return handleValidationError(result.error);
    }

    const validateData = result.data;

    const menu = await prisma.menu.update({
      where: { id },
      data: validateData,
    });

    return NextResponse.json(menu, { status: 200 });
  } catch (error) {
    return handleError(error, "Failed to update menu");
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

    const menuExist = await prisma.menu.findUnique({
      where: { id },
    });

    if (!menuExist) {
      return handleCustomError("Menu not found", 404);
    }

    const menu = await prisma.menu.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Menu deleted successfully", menu },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "Failed to delete menu");
  }
}
