import { useState } from "react";
import { Avatar } from "../../atoms/avatar/Avatar";
import { Button } from "../../atoms/button/Button";
import type { Category } from "../../../constants/categories";
import { CategoryTag } from "../../atoms/categorytag/CategoryTag";
import { TipDetailModal } from "../tipdetailmodal/TipDetailModal";

interface TipCardProps {
  title: string;
  user_id: string;
  content: string;
  created_at: string;
  onLike?: () => void;
  likeCount?: number;
  onMoreTip?: (content: string) => void;
  moreTips?: {
    id: number;
    tip_id: number;
    user_id: string;
    content: string;
    created_at: string;
    userName?: string;
  }[];
  isLiked?: boolean;
  userName?: string;
  avatarUrl?: string;
  category?: Category;
  tags?: string[];
}

export const TipCard = ({
  title,
  user_id,
  content,
  created_at,
  onLike,
  likeCount,
  onMoreTip,
  moreTips,
  isLiked,
  userName,
  avatarUrl,
  category,
  tags,
}: TipCardProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="bg-card border border-border rounded-xl p-4 mb-3 flex gap-3 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <Avatar src={avatarUrl ?? ""} alt={userName ?? user_id} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-medium text-text-main">{userName}</p>
            <p className="text-text-muted text-sm">
              {new Date(created_at).toLocaleDateString("ja-JP")}
            </p>
          </div>
          {category && (
            <div className="mt-1">
              <CategoryTag category={category} />
            </div>
          )}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-accent-light text-accent text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <p className="font-semibold mt-1 text-text-main">{title}</p>
          <p className="mt-1 text-text-sub line-clamp-2">{content}</p>

          {/* いいねボタンだけ残す */}
          <div className="mt-3 flex items-center gap-4">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onLike?.();
              }}
            >
              {isLiked ? "❤️" : "🤍"} {likeCount}
            </Button>
          </div>
        </div>
      </div>

      {showModal && (
        <TipDetailModal
          tip={{
            id: 0,
            title,
            content,
            created_at,
            userName,
            avatarUrl,
            category,
            likeCount,
            isLiked,
            moreTips,
          }}
          onClose={() => setShowModal(false)}
          onLike={onLike}
          onMoreTip={onMoreTip}
        />
      )}
    </>
  );
};
