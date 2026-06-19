import type { Category } from "../../../constants/categories";

interface CategoryTagProps {
  category: Category;
}

export const CategoryTag = ({ category }: CategoryTagProps) => {
  return (
    <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-yellow-tip text-brown border border-brown">
      {category}
    </span>
  );
};
