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
    <div className="bg-paper border-[2.5px] border-dashed border-brown rounded-2xl p-4 mb-3 flex gap-3">
      <Avatar src={avatarUrl ?? ""} alt={userName ?? user_id} />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-bold text-brown">{userName}</p>
          <p className="text-brown-soft text-sm">
            {new Date(created_at).toLocaleDateString("ja-JP")}
          </p>
        </div>
        <p className="font-semibold mt-1 text-brown">{title}</p>
        <p className="mt-1 text-brown-soft">{content}</p>
        <div className="mt-2">
          <Button onClick={onLike}>
            {isLiked ? "❤️" : "🤍"} {likeCount}
          </Button>
        </div>
        {/**MoreTipsの一覧を表示する */}
        {moreTips?.map((moreTip) => (
          <div
            key={moreTip.id}
            className="mt-2 pl-4 border-l-2 border-dashed border-brown"
          >
            <p className="text-sm text-brown-soft">{moreTip.content}</p>
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
