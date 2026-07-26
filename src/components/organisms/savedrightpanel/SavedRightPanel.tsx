import type { Category } from "../../../constants/categories";
import { CATEGORY_STYLES } from "../../../constants/categoryStyles";

interface CategoryCount {
  category: Category;
  count: number;
}

interface SavedRightPanelProps {
  categoryCounts: CategoryCount[];
}

export const SavedRightPanel = ({ categoryCounts }: SavedRightPanelProps) => {
  return (
    <div>
      <p className="text-xs text-text-muted mb-3">カテゴリ別の内訳</p>
      <div className="flex flex-col gap-2">
        {categoryCounts.map(({ category, count }) => {
          const style = CATEGORY_STYLES[category];
          const Icon = style.icon;

          return (
            <div
              key={category}
              className="flex items-center justify-between text-sm"
            >
              <span className="flex items-center gap-2 text-text-sub">
                <Icon size={14} className={style.text} />
                {category}
              </span>
              <span className="text-text-main font-medium">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
