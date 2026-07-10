import { useState } from "react";
import { Avatar } from "../../atoms/avatar/Avatar";
import type { Category } from "../../../constants/categories";
import { CategoryTag } from "../../atoms/categorytag/CategoryTag";
import { TipDetailModal } from "../tipdetailmodal/TipDetailModal";
import { Link } from "react-router-dom";
import { Heart, Bookmark } from "lucide-react";

interface TipCardProps {
  title: string;
  user_id: string;
  content: string;
  created_at: string;
  onLike?: () => void;
  onBookmark?: () => void;
  likeCount?: number;
  bookmarkCount?: number;
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
  userId?: string;
}

export const TipCard = ({
  title,
  user_id,
  content,
  created_at,
  onLike,
  onBookmark,
  likeCount,
  bookmarkCount,
  onMoreTip,
  moreTips,
  isLiked,
  isBookmark,
  userName,
  avatarUrl,
  category,
  tags,
  userId,
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
              disabled={userId === user_id}
              onClick={(e) => {
                e.stopPropagation();
                onLike?.();
              }}
              className={`flex items-center gap-1 text-sm transition-colors ${
                userId === user_id
                  ? "text-text-muted cursor-not-allowed"
                  : "text-text-sub hover:text-red-500 cursor-pointer"
              }`}
            >
              <Heart
                size={18}
                fill={isLiked ? "currentColor" : "none"}
                className={isLiked ? "text-red-500" : ""}
              />
              <span>{likeCount}</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookmark?.();
              }}
              className={`flex items-center gap-1 text-sm transition-colors cursor-pointer ${
                isBookmark
                  ? "text-indigo-500"
                  : "text-text-sub hover:text-indigo-500"
              }`}
            >
              <Bookmark size={18} fill={isBookmark ? "currentColor" : "none"} />
              <span>{bookmarkCount}</span>
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
