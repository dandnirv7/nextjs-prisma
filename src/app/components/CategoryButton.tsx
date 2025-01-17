import { Button } from "@/components/ui/button";

interface CategoryButtonProps {
  name: string;
}

const CategoryButton = ({ name }: CategoryButtonProps) => (
  <li className="w-full">
    <Button className="w-full capitalize">{name}</Button>
  </li>
);

export default CategoryButton;
