import { FormSchema } from "@/schemas/formSchema";
import { handleError, handleValidationError } from "@/utils/errorHandler";
import { ERROR_MESSAGES } from "@/utils/errorMessage";
import prisma from "db/client";
import { NextRequest, NextResponse } from "next/server";
import { Categories, Prisma } from "@prisma/client";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);

    const pageParam = searchParams.get("page") || "1";
    const limitParam = searchParams.get("limit") || "10";
    const search = searchParams.get("search") || "";
    const categoriesParam = searchParams.get("categories") || "";

    const page = parseInt(pageParam, 10);
    const limit = parseInt(limitParam, 10);

    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_ID },
        { status: 400 }
      );
    }

    if (isNaN(limit) || limit < 1) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_ID },
        { status: 400 }
      );
    }

    const offset = (page - 1) * limit;

    const whereCondition: Prisma.MenuWhereInput = {
      name: {
        contains: search,
        mode: "insensitive",
      },
    };

    if (categoriesParam) {
      const categoriesArray = categoriesParam.split(".") as Categories[];
      whereCondition.category = {
        in: categoriesArray,
      };
    }

    const menus = await prisma.menu.findMany({
      where: whereCondition,
      skip: offset,
      take: limit,
    });

    const totalMenus = await prisma.menu.count({
      where: whereCondition,
    });

    const response = {
      total_menus: totalMenus,
      total_pages: Math.ceil(totalMenus / limit),
      page,
      limit,
      menus,
    };

    return NextResponse.json(response);
  } catch (error) {
    return handleError(error, ERROR_MESSAGES.PROCESS_FAILED);
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
