import { Menu } from "@prisma/client";

export const getCategories = (menus: Menu[]) => {
  if (!Array.isArray(menus)) {
    console.error("Menus should be an array, but got:", menus);
    return [];
  }

  const uniqueCategories = [...new Set(menus.map((menu) => menu.category))];
  return uniqueCategories.map((category) => ({
    value: category,
    label: category,
  }));
};
