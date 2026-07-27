import { Bookmark } from "lucide-react";
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
  const total = categoryCounts.reduce((sum, { count }) => sum + count, 0);
  const sorted = [...categoryCounts].sort((a, b) => b.count - a.count);

  return (
    <div className="flex flex-col gap-5">
      {/* 合計カード */}
      <div className="bg-accent-light rounded-xl p-4 flex items-center gap-3">
        <div className="bg-accent rounded-lg p-2">
          <Bookmark size={16} className="text-white" fill="white" />
        </div>
        <div>
          <p className="text-xs text-text-sub">保存済みTip</p>
          <p className="text-2xl font-bold text-accent leading-tight">{total}<span className="text-sm font-normal text-text-sub ml-1">件</span></p>
        </div>
      </div>

      {/* カテゴリ内訳 */}
      {sorted.length > 0 && (
        <div>
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">カテゴリ別の内訳</p>
          <div className="flex flex-col gap-3">
            {sorted.map(({ category, count }) => {
              const style = CATEGORY_STYLES[category];
              const Icon = style.icon;
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;

              return (
                <div key={category}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="flex items-center gap-1.5 text-sm text-text-sub">
                      <Icon size={13} className={style.text} />
                      {category}
                    </span>
                    <span className="text-xs font-semibold text-text-main">{count}</span>
                  </div>
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${style.bar}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
