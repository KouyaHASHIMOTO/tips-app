import { useState, useRef, useEffect } from "react";
import { Avatar } from "../../atoms/avatar/Avatar";
import type { Category } from "../../../constants/categories";
import { CategoryTag } from "../../atoms/categorytag/CategoryTag";
import { TipDetailModal } from "../tipdetailmodal/TipDetailModal";
import { Link } from "react-router-dom";
import { Heart, Bookmark } from "lucide-react";
import { formatRelativeTime } from "../../../lib/formatRelativeTime";

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
  userId,
}: TipCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const raf = requestAnimationFrame(() => {
      setIsClamped(el.scrollHeight > el.clientHeight);
    });
    return () => cancelAnimationFrame(raf);
  }, [content]);

  return (
    <>
      <div
        className="bg-card border border-border rounded-xl p-4 mb-3 cursor-pointer transition-colors duration-150 hover:border-[#d5d5d2]"
        onClick={() => setShowModal(true)}
      >
        {/* 上段: カテゴリ + 経過時間 */}
        <div className="flex items-center justify-between mb-2">
          {category && <CategoryTag category={category} />}
          <p className="text-text-muted text-xs">
            {formatRelativeTime(created_at)}
          </p>
        </div>

        {/* タイトル: 目立つスタイルに変更 */}
        <p
          data-testid="tip-title"
          className="text-lg font-medium text-text-main mb-1"
        >
          {title}
        </p>
        <div className="mb-3">
          <div className="relative">
            <p
              ref={contentRef}
              className="text-text-sub line-clamp-2 text-sm leading-relaxed"
            >
              {content}
            </p>
            {isClamped && (
              <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-card to-transparent pointer-events-none" />
            )}
          </div>
          {isClamped && (
            <p className="text-xs text-accent font-medium mt-1">続きを読む →</p>
          )}
        </div>

        {/* 下段: いいね・保存 + アバター・ユーザー名 */}
        <div className="flex items-center justify-between border-t border-border pt-2">
          <div className="flex items-center gap-2">
            <button
              disabled={userId === user_id}
              data-testid="like-button"
              onClick={(e) => {
                e.stopPropagation();
                onLike?.();
              }}
              className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full transition-colors ${
                userId === user_id
                  ? "text-text-muted cursor-not-allowed"
                  : isLiked
                    ? "text-red-500 bg-red-50"
                    : "text-text-sub hover:bg-red-50 hover:text-red-500 cursor-pointer"
              }`}
            >
              <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
              <span>{likeCount}</span>
            </button>

            <button
              data-testid="bookmark-button"
              onClick={(e) => {
                e.stopPropagation();
                onBookmark?.();
              }}
              className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full transition-colors cursor-pointer ${
                isBookmark
                  ? "text-accent bg-accent-light"
                  : "text-text-sub hover:bg-accent-light hover:text-accent"
              }`}
            >
              <Bookmark size={16} fill={isBookmark ? "currentColor" : "none"} />
              <span>{bookmarkCount}</span>
            </button>
          </div>

          <Link
            to={`/users/${user_id}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2"
          >
            <Avatar src={avatarUrl ?? ""} alt={userName ?? user_id} />
            <p className="font-medium text-text-main text-sm">{userName}</p>
          </Link>
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
