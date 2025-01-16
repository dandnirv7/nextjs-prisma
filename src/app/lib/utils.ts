import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Menu, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchMenus = async () => {
  return await prisma.menu.findMany();
};

export const getCategories = (menus: Menu[]) => {
  return [...new Set(menus.map((menu) => menu.category))].map((category) => ({
    name: category,
  }));
};

export const toRupiahs = (price: number) => {
  if (!price) return;
  return price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
};
