import { getCategories } from "@/lib/menuUtils";
import { fetchMenus } from "services/menu";

const initializeCategoryOptions = async () => {
  const data = await fetchMenus();
  const categories = getCategories(data.menus);
  return categories;
};

export const CATEGORY_OPTIONS = await initializeCategoryOptions();
