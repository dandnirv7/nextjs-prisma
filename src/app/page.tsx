import { fetchMenus, getCategories } from "@/lib/utils";
import MenuList from "@/components/MenuList";
import Sidebar from "@/components/Sidebar";

const page = async () => {
  const allMenus = await fetchMenus();
  const categories = getCategories(allMenus);

  return (
    <main className="grid grid-cols-12 gap-4">
      <Sidebar categories={categories} />
      <MenuList menuItems={allMenus} />
    </main>
  );
};

export default page;
