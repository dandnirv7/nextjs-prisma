import React from "react";
import { Button } from "./ui/button";
import CategoryButton from "./CategoryButton";

interface SideBarProps {
  categories: Array<{ name: string }>;
}

const Sidebar = ({ categories }: SideBarProps) => {
  return (
    <aside className="bg-zinc-200/75 col-span-2 p-4 h-screen rounded-lg">
      <div>
        <ul className="flex flex-col gap-3 items-start justify-center">
          <Button className="w-full capitalize">All</Button>
          {categories.map((category, index) => (
            <CategoryButton key={index} name={category.name} />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
