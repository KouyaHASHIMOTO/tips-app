import { useState } from "react";
import { Avatar } from "../../atoms/avatar/Avatar";
import { Button } from "../../atoms/button/Button";
import type { Category } from "../../../constants/categories";
import { CategoryTag } from "../../atoms/categorytag/CategoryTag";
import { TipDetailModal } from "../tipdetailmodal/TipDetailModal";
import { Link } from "react-router-dom";

interface TipCardProps {
  title: string;
  user_id: string;
  content: string;
  created_at: string;
  onLike?: () => void;
  onBookmark?: () => void;
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
  isBookmark?: boolean;
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
  onBookmark,
  likeCount,
  onMoreTip,
  moreTips,
  isLiked,
  isBookmark,
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
        <Link to={`/users/${user_id}`} onClick={(e) => e.stopPropagation()}>
          <Avatar src={avatarUrl ?? ""} alt={userName ?? user_id} />
        </Link>
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

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLike?.();
              }}
              className={` flex items-center gap-1 px-3 py-1 rounded-full border transition-colors cursor-pointer ${
                isLiked
                  ? "bg-red-50 border-red-200 text-red-500"
                  : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              <span>{isLiked ? "❤️" : "🤍"}</span>
              <span className="text-sm">{likeCount}</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookmark?.();
              }}
              className={`flex items-center gap-1 px-3 py-1 rounded-full border transition-colors cursor-pointer ${
                isBookmark
                  ? "bg-indigo-50 border-indigo-200 text-indigo-500"
                  : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              <span>{isBookmark ? "📌" : "🔖"}</span>
              <span className="text-sm">
                {isBookmark ? "保存済み" : "保存"}
              </span>
            </button>
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
