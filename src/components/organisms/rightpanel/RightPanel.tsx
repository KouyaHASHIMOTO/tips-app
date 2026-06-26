interface TrendTag {
  name: string;
  count: number;
}

interface RightPanelProps {
  trendTags: TrendTag[];
  onTagSearch?: (tag: string) => void;
  onPostClick?: () => void;
}

export const RightPanel = ({
  trendTags,
  onTagSearch,
  onPostClick,
}: RightPanelProps) => {
  return (
    <div className="flex flex-col gap-6">
      {/* 検索欄 */}
      <input
        type="text"
        placeholder="タグで検索..."
        onChange={(e) => onTagSearch?.(e.target.value)}
        className="w-full p-2 border border-border rounded-lg text-text-main bg-card outline-none text-sm"
      />

      {/* トレンドタグ */}
      {trendTags.length > 0 && (
        <div>
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
            トレンドタグ
          </p>
          <div className="flex flex-col gap-2">
            {trendTags.map((tag, index) => (
              <div
                key={tag.name}
                className="flex items-center gap-3 cursor-pointer hover:opacity-70"
                onClick={() => onTagSearch?.(tag.name)}
              >
                <span className="text-sm font-medium text-text-muted w-4">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-accent">#{tag.name}</p>
                  <p className="text-xs text-text-muted">{tag.count}件のTips</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 投稿ボタン */}
      <button
        onClick={() => onPostClick?.()}
        className="w-full p-3 bg-accent text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
      >
        + Tipを投稿する
      </button>
    </div>
  );
};
