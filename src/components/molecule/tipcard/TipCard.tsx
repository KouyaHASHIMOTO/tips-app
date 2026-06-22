import { useState } from "react";
import { Avatar } from "../../atoms/avatar/Avatar";
import { Button } from "../../atoms/button/Button";
import { MoreTipForm } from "../moretipform/MoreTipForm";
import type { Category } from "../../../constants/categories";
import { CategoryTag } from "../../atoms/categorytag/CategoryTag";

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
  }[];
  isLiked?: boolean;
  userName?: string;
  avatarUrl?: string;
  category?: Category;
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
}: TipCardProps) => {
  const [showMoreTipForm, setShowMoreTipForm] = useState(false);

  return (
    <div className="bg-card border border-border rounded-xl p-4 mb-3 flex gap-3">
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
        <p className="font-semibold mt-1 text-text-main">{title}</p>
        <p className="mt-1 text-text-sub">{content}</p>
        <div className="mt-2">
          <Button onClick={onLike}>
            {isLiked ? "❤️" : "🤍"} {likeCount}
          </Button>
        </div>
        {moreTips?.map((moreTip) => (
          <div key={moreTip.id} className="mt-2 pl-4 border-l-2 border-border">
            <p className="text-sm text-text-sub">{moreTip.content}</p>
          </div>
        ))}
        <div className="mt-2">
          <Button onClick={() => setShowMoreTipForm(true)}>MoreTip</Button>
          {showMoreTipForm && <MoreTipForm onSubmit={onMoreTip} />}
        </div>
      </div>
    </div>
  );
};
