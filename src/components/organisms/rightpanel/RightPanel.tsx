interface RightPanelProps {
  onPostClick?: () => void;
}

export const RightPanel = ({ onPostClick }: RightPanelProps) => {
  return (
    <div className="flex flex-col gap-6">
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
