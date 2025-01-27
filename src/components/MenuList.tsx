import React from "react";
import MenuCard from "./MenuCard";
import { Menu } from "@prisma/client";

const MenuList = ({ menuItems }: { menuItems: Menu[] }) => {
  return (
    <main className="bg-zinc-200/75 col-span-10 p-4 rounded-lg h-screen overflow-hidden">
      <div className="grid grid-cols-12 gap-4 overflow-y-auto max-h-full">
        {menuItems.map((menu) => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </div>
    </main>
  );
};

export default MenuList;
