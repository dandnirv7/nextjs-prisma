import MenuCard from "@/components/MenuCard";
import { MenuForm } from "@/components/MenuForm";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: {
    id: number;
  };
}

const page = async ({ params }: PageProps) => {
  const { id } = params;

  const selectedMenu = await prisma.menu.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!selectedMenu) {
    return <div>Menu not found</div>;
  }

  return (
    <>
      <div className="bg-white border-b">
        <div className="px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Edit Menu Item</h1>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 py-5 ">
          <MenuForm
            name={selectedMenu.name}
            category={selectedMenu.category}
            price={selectedMenu.price}
            description={selectedMenu.description}
            imageUrl={selectedMenu.imageUrl}
            id={Number(id)}
          />
        </div>
        <div className="flex-1 ">
          <div className="max-w-2xl py-2 mx-auto">
            <h2 className="mb-2 text-lg font-bold">Preview</h2>
            <MenuCard menu={selectedMenu} isEditable={false} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
