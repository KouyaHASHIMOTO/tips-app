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
}

export const TipCard = ({
  title,
  user_id,
  content,
  created_at,
  onLike,
  likeCount,
  onMoreTip,
}: TipCardProps) => {
  const [showMoreTipForm, setShowMoreTipForm] = useState(false);
  return (
    <div className="border-b border-gray-200 p-4 flex gap-3">
      <Avatar src="https://example.com/avatar.jpg" alt={user_id} />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-bold">{user_id}</p>
          <p className="text-gray-400 text-sm">
            {new Date(created_at).toLocaleDateString("ja-JP")}
          </p>
        </div>
        <p className="font-semibold mt-1">{title}</p>
        <p className="mt-1 text-gray-800">{content}</p>
        <div className="mt-2">
          <Button onClick={onLike}>❤️ {likeCount}</Button>
        </div>
        <div className="mt-2">
          <Button onClick={() => setShowMoreTipForm(true)}>MoreTip</Button>
          {showMoreTipForm && <MoreTipForm onSubmit={onMoreTip} />}
        </div>
      </div>
    </div>
  );
};
