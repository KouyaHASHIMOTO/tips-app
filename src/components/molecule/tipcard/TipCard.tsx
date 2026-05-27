import { Avatar } from "../../atoms/avatar/Avatar";
import { Button } from "../../atoms/button/Button";

interface TipCardProps {
  user_id: string;
  content: string;
  created_at: string;
}

export const TipCard = ({ user_id, content, created_at }: TipCardProps) => {
  return (
    <div className="border-b border-gray-200 p-4 flex gap-3">
      <Avatar src="https://example.com/avatar.jpg" alt={user_id} />
      <div className="flex-1">
        <p className="font-bold">{user_id}</p>
        <p className="mt-1 text-gray-800">{content}</p>
        <div className="mt-2">
          <Button>❤️ 5</Button>
        </div>
      </div>
    </div>
  );
};
