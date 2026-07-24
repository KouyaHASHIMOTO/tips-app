import type { Category } from "../../../constants/categories";

interface CategoryTagProps {
  category: Category;
}

export const CategoryTag = ({ category }: CategoryTagProps) => {
  return (
    <span
      data-testid="category"
      className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-accent-light text-accent border border-border"
    >
      {category}
    </span>
  );
};
