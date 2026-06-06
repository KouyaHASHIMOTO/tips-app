import { TipCard } from "../../molecule/tipcard/TipCard";

interface TipListProps {
  tips: {
    id: number;
    title: string;
    user_id: string;
    content: string;
    created_at: string;
    likes: {
      id: number;
      tip_id: number;
      user_id: string;
    }[];
    more_tips: {
      id: number;
      tip_id: number;
      user_id: string;
      content: string;
      created_at: string;
    }[];
  }[];

  userId: string;

  onLike?: (tipId: number) => void;

  onMoreTip?: (tipId: number, content: string) => void;
}

export const TipList = ({ tips, onLike, onMoreTip, userId }: TipListProps) => {
  return (
    <div className="divide-y divide-gray-200">
      {tips.map((tip) => (
        <TipCard
          key={tip.id}
          title={tip.title}
          user_id={tip.user_id}
          content={tip.content}
          created_at={tip.created_at}
          onLike={() => onLike?.(tip.id)}
          likeCount={tip.likes.length ?? 0}
          onMoreTip={(content) => onMoreTip?.(tip.id, content)}
          moreTips={tip.more_tips}
          isLiked={tip.likes.some((like) => like.user_id === userId)}
        />
      ))}
    </div>
  );
};
