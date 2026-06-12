import { useState } from "react";
import { Avatar } from "../../atoms/avatar/Avatar";
import { Button } from "../../atoms/button/Button";
import { MoreTipForm } from "../moretipform/MoreTipForm";

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
}: TipCardProps) => {
  const [showMoreTipForm, setShowMoreTipForm] = useState(false);
  return (
    <div className="border-b border-gray-200 p-4 flex gap-3">
      <Avatar src={avatarUrl ?? ""} alt={userName ?? user_id} />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-bold">{userName}</p>
          <p className="text-gray-400 text-sm">
            {new Date(created_at).toLocaleDateString("ja-JP")}
          </p>
        </div>
        <p className="font-semibold mt-1">{title}</p>
        <p className="mt-1 text-gray-800">{content}</p>
        <div className="mt-2">
          <Button onClick={onLike}>
            {isLiked ? "❤️" : "🤍"} {likeCount}
          </Button>
        </div>
        {/**MoreTipsの一覧を表示する */}
        {moreTips?.map((moreTip) => (
          <div key={moreTip.id} className="mt-2 pl-4 border-l border-gray-200">
            <p className="text-sm text-gray-600">{moreTip.content}</p>
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
