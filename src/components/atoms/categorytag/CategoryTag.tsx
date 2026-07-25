import type { Category } from "../../../constants/categories";
import { CATEGORY_STYLES } from "../../../constants/categoryStyles";

interface CategoryTagProps {
  category: Category;
}

export const CategoryTag = ({ category }: CategoryTagProps) => {
  const style = CATEGORY_STYLES[category];
  const Icon = style.icon;

  return (
    <span
      data-testid="category-tag"
      className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}
    >
      <Icon size={12} />
      {category}
    </span>
  );
};
