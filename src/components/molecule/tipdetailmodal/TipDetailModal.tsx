import { Avatar } from "../../atoms/avatar/Avatar";
import { Button } from "../../atoms/button/Button";
import { CategoryTag } from "../../atoms/categorytag/CategoryTag";
import type { Category } from "../../../constants/categories";

interface MoreTip {
  id: number;
  tip_id: number;
  user_id: string;
  content: string;
  created_at: string;
  userName?: string;
}

interface TipDetailModalProps {
  tip: {
    id: number;
    title: string;
    content: string;
    created_at: string;
    userName?: string;
    avatarUrl?: string;
    category?: Category;
    likeCount?: number;
    isLiked?: boolean;
    moreTips?: MoreTip[];
  };
  onClose: () => void;
  onLike?: () => void;
}

export const TipDetailModal = ({
  tip,
  onClose,
  onLike,
}: TipDetailModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      data-testid="modal-overlay"
      onClick={onClose}
    >
      <div
        className="bg-card border border-border rounded-xl p-6 w-full max-w-lg mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 閉じるボタン */}
        <button
          aria-label="閉じる"
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text-main transition-colors"
        >
          ✕
        </button>

        {/* ヘッダー */}
        <div className="flex items-center gap-3 mb-4">
          <Avatar src={tip.avatarUrl ?? ""} alt={tip.userName ?? ""} />
          <div className="flex-1">
            <p className="font-medium text-text-main">{tip.userName}</p>
            <p className="text-text-muted text-sm">
              {new Date(tip.created_at).toLocaleDateString("ja-JP")}
            </p>
          </div>
          {tip.category && <CategoryTag category={tip.category} />}
        </div>

        {/* 本文 */}
        <p className="font-semibold text-text-main text-lg mb-2">{tip.title}</p>
        <p className="text-text-sub mb-4">{tip.content}</p>

        {/* MoreTips */}
        {tip.moreTips && tip.moreTips.length > 0 && (
          <div className="border-t border-border pt-4 mb-4">
            <p className="text-sm font-medium text-text-sub mb-3">MoreTip</p>
            {tip.moreTips.map((moreTip) => (
              <div
                key={moreTip.id}
                className="pl-4 border-l-2 border-border mb-3"
              >
                <p className="text-sm text-text-sub">{moreTip.content}</p>
                {moreTip.userName && (
                  <p className="text-xs text-text-muted mt-1">
                    {moreTip.userName}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* いいねボタン */}
        <div className="border-t border-border pt-4">
          <Button onClick={onLike}>
            {tip.isLiked ? "❤️" : "🤍"} {tip.likeCount}
          </Button>
        </div>
      </div>
    </div>
  );
};
