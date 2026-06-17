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
    profiles: {
      id: number;
      tip_id: number;
      user_name: string;
      avatar_url: string;
      created_at: string;
    } | null;
  }[];

  userId: string;

  onLike?: (tipId: number, isLiked: boolean) => void;

  onMoreTip?: (tipId: number, content: string) => void;
}

export const TipList = ({ tips, onLike, onMoreTip, userId }: TipListProps) => {
  return (
    <div className="divide-y divide-gray-200">
      {tips.map((tip) => {
        const isLiked = tip.likes.some((like) => like.user_id === userId);
        return (
          <TipCard
            key={tip.id}
            title={tip.title}
            user_id={tip.user_id}
            content={tip.content}
            created_at={tip.created_at}
            onLike={() => onLike?.(tip.id, isLiked)}
            likeCount={tip.likes.length ?? 0}
            onMoreTip={(content) => onMoreTip?.(tip.id, content)}
            moreTips={tip.more_tips}
            isLiked={isLiked}
            userName={tip.profiles?.user_name}
            avatarUrl={tip.profiles?.avatar_url}
          />
        );
      })}
    </div>
  );
};
