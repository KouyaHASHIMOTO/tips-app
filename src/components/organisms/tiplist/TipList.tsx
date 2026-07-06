import type { Category } from "../../../constants/categories";
import { TipCard } from "../../molecule/tipcard/TipCard";

interface TipListProps {
  tips: {
    id: number;
    title: string;
    user_id: string;
    content: string;
    created_at: string;
    category: Category;
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
    tip_tags: {
      tags: {
        name: string;
      } | null;
    }[];
    profiles: {
      id: number;
      tip_id: number;
      user_name: string;
      avatar_url: string;
      created_at: string;
    } | null;
    bookmarks: {
      id: number;
      tip_id: number;
      user_id: string;
      created_at: string;
    }[];
  }[];

  userId: string;

  onLike?: (tipId: number, isLiked: boolean) => void;

  onMoreTip?: (tipId: number, content: string) => void;

  onBookmark?: (tipId: number, isBookmark: boolean) => void;
}

export const TipList = ({
  tips,
  onLike,
  onMoreTip,
  userId,
  onBookmark,
}: TipListProps) => {
  return (
    <div>
      {tips.map((tip) => {
        const isLiked = tip.likes.some((like) => like.user_id === userId);
        const isBookmark = tip.bookmarks.some(
          (bookmark) => bookmark.user_id === userId
        );
        return (
          <TipCard
            key={tip.id}
            title={tip.title}
            category={tip.category}
            user_id={tip.user_id}
            content={tip.content}
            created_at={tip.created_at}
            onLike={() => onLike?.(tip.id, isLiked)}
            onBookmark={() => onBookmark?.(tip.id, isBookmark)}
            likeCount={tip.likes.length ?? 0}
            onMoreTip={(content) => onMoreTip?.(tip.id, content)}
            moreTips={tip.more_tips}
            isLiked={isLiked}
            isBookmark={isBookmark}
            userName={tip.profiles?.user_name}
            avatarUrl={tip.profiles?.avatar_url}
            tags={tip.tip_tags
              .map((tt) => tt.tags?.name)
              .filter((name): name is string => name !== undefined)}
          />
        );
      })}
    </div>
  );
};
