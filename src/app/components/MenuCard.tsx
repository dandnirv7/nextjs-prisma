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
import { toRupiahs } from "@/utils/helpers";
import { Menu } from "@prisma/client";
import { Archive, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MenuCardProps {
  menu: Menu;
  isEditable?: boolean;
}

const MenuCard = ({ menu, isEditable = true }: MenuCardProps) => (
  <Card
    className={cn("w-full bg-white shadow-lg flex flex-col", {
      "col-span-4": isEditable,
    })}
  >
    <div className="relative">
      <Image
        src={menu.imageUrl}
        alt={menu.name}
        className={cn("object-cover rounded-t-lg w-full", {
          "h-96": !isEditable,
          "h-48": isEditable,
        })}
        width={200}
        height={200}
      />
      <Badge
        variant="shadow"
        className="absolute text-black top-2 right-2 bg-black/40"
      >
        Stock: {10}
      </Badge>
    </div>

    <CardHeader
      className={cn("space-y-1 p-4 flex-1", {
        "text-xl": !isEditable,
        "text-base": isEditable,
      })}
    >
      <div className="flex items-center justify-between">
        <CardTitle
          className={cn("font-bold", {
            "text-2xl": !isEditable,
            "text-xl": isEditable,
          })}
        >
          {menu.name}
        </CardTitle>
        <span
          className={cn("font-semibold text-green-500", {
            "text-lg": !isEditable,
            "text-base": isEditable,
          })}
        >
          {toRupiahs(menu.price)}
        </span>
      </div>
      <CardDescription
        className={cn("text-sm text-gray-500", {
          "line-clamp-3": isEditable,
        })}
      >
        {menu.description}
      </CardDescription>
    </CardHeader>

    <CardContent className="p-4 pt-0">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Category:</span>
          <span className="capitalize">{menu.category}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Status:</span>
          <Badge variant="success" className="bg-green-50">
            {menu.status === true ? "Available" : "Not Available"}
          </Badge>
        </div>
      </div>
    </CardContent>

    {isEditable && (
      <CardFooter className="p-4 pt-0">
        <div className="flex w-full gap-2">
          <Link href={`/edit/${menu.id}`} passHref>
            <Button variant="outline" size="sm" className="flex-1">
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </Link>
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
    )}
  </Card>
);

export default MenuCard;
