import { Menu, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const fetchMenus = async () => {
  return await prisma.menu.findMany();
};

export const getCategories = (menus: Menu[]) => {
  return [...new Set(menus.map((menu) => menu.category))].map((category) => ({
    name: category,
  }));
};
