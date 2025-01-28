import { Menu } from "@prisma/client";

export const fetchMenus = async (
  page = 1,
  limit = 10,
  search = "",
  categories = ""
): Promise<{
  total_menus: number;
  total_pages: number;
  page: number;
  limit: number;
  menus: Menu[];
}> => {
  const queryParams = new URLSearchParams();

  queryParams.set("page", page.toString());
  queryParams.set("limit", limit.toString());

  if (search) queryParams.set("search", search);
  if (categories) queryParams.set("categories", categories);

  const response = await fetch(`/api/menu?${queryParams.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch menus");
  }

  const data = await response.json();
  return data;
};
