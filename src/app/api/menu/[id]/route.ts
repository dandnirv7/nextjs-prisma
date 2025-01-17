import prisma from "db/client";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const menu = await prisma.menu.update({
      where: { id: Number(params.id) },
      data: {
        name: body.name,
        category: body.category,
        price: body.price,
        description: body.description,
        imageUrl: body.imageUrl || "",
        status: body.status,
      },
    });

    return NextResponse.json(menu);
  } catch (error) {
    console.error("Failed to update menu:", error);
    return NextResponse.json(
      { error: "Failed to update menu" },
      { status: 500 }
    );
  }
}
