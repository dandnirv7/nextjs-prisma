import { MenuForm } from "@/components/MenuForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

import Badge from "@/components/ui/badge";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toRupiahs } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/db";

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
    <div>
      <div className="bg-white border-b">
        <div className="px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Edit Menu Item</h1>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex-1 overflow-hidden">
          <Card className="max-w-2xl w-full p-5 overflow-y-auto max-h-[90vh]">
            <MenuForm
              name={selectedMenu.name}
              category={selectedMenu.category}
              price={selectedMenu.price}
              description={selectedMenu.description}
              imageUrl={selectedMenu.imageUrl}
              id={Number(id)}
            />
          </Card>
        </div>
        <div className="flex-1 p-2 bg-gray-50 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-lg font-bold mb-2">Preview</h2>
            <Card
              className="w-full bg-white shadow-lg col-span-4 flex flex-col"
              key={selectedMenu.id}
            >
              <div className="relative">
                <Image
                  src={selectedMenu.imageUrl}
                  alt={selectedMenu.name}
                  className="w-full h-96 object-cover rounded-t-lg"
                  width={200}
                  height={200}
                />
                <Badge
                  variant="shadow"
                  className="absolute top-2 right-2 bg-black/40 text-black"
                >
                  Stock: {10}
                </Badge>
              </div>

              <CardHeader className="space-y-1 p-4 flex-1">
                <div className="flex justify-between items-center">
                  <CardTitle className="font-bold text-2xl">
                    {selectedMenu.name}
                  </CardTitle>
                  <span className="font-semibold text-lg text-green-600">
                    {toRupiahs(selectedMenu.price)}
                  </span>
                </div>
                <CardDescription className="text-sm text-gray-500 line-clamp-3">
                  {selectedMenu.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-4 pt-0">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 text-base">Category:</span>
                    <span className="capitalize text-base">
                      {selectedMenu.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 text-base">Status:</span>
                    <Badge
                      variant="success"
                      size="large"
                      className="bg-green-50"
                    >
                      {selectedMenu.status === true
                        ? "Available"
                        : "Not Available"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
