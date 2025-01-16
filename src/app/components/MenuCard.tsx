import { Pencil, Archive, Trash2 } from "lucide-react";
import Image from "next/image";
import Badge from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toRupiahs } from "@/lib/utils";
import { Menu } from "@prisma/client";

interface MenuCardProps {
  menu: Menu;
}

const MenuCard = ({ menu }: MenuCardProps) => (
  <Card
    className="w-full max-w-sm bg-white shadow-lg col-span-4 flex flex-col"
    key={menu.id}
  >
    <div className="relative">
      <Image
        src={menu.imageUrl}
        alt={menu.name}
        className="w-full h-48 object-cover rounded-t-lg"
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
        <CardTitle className="font-bold text-xl">{menu.name}</CardTitle>
        <span className="font-semibold text-lg text-green-600">
          {toRupiahs(menu.price)}
        </span>
      </div>
      <CardDescription className="text-sm text-gray-500">
        {menu.description}
      </CardDescription>
    </CardHeader>

    <CardContent className="p-4 pt-0">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Category:</span>
          <span className="capitalize">{menu.category}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Status:</span>
          <Badge variant="success" className="bg-green-50">
            {menu.status === true ? "Available" : "Not Available"}
          </Badge>
        </div>
      </div>
    </CardContent>

    <CardFooter className="p-4 pt-0">
      <div className="flex gap-2 w-full">
        <Button variant="outline" size="sm" className="flex-1">
          <Pencil className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <Archive className="w-4 h-4 mr-2" />
          Archive
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>
    </CardFooter>
  </Card>
);

export default MenuCard;
