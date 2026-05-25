import { Avatar } from "../../atoms/avatar/Avatar";
import { Button } from "../../atoms/button/Button";

interface TipCardProps {
  userName: string;
  content: string;
  likeCount: number;
}

export const TipCard = ({ userName, content, likeCount }: TipCardProps) => {
  return (
    <div className="border-b border-gray-200 p-4 flex gap-3">
      <Avatar src="https://example.com/avatar.jpg" alt={userName} />
      <div className="flex-1">
        <p className="font-bold">{userName}</p>
        <p className="mt-1 text-gray-800">{content}</p>
        <div className="mt-2">
          <Button>❤️ {likeCount}</Button>
        </div>
      </div>
    </div>
  );
};
