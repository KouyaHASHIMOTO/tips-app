import { TipCard } from "../../molecule/tipcard/TipCard";

interface TipListProps {
  tips: {
    id: string;
    userName: string;
    content: string;
    likeCount: number;
  }[];
}

export const TipList = ({ tips }: TipListProps) => {
  return (
    <div className="divide-y divide-gray-200">
      {tips.map((tip) => (
        <TipCard
          key={tip.id}
          userName={tip.userName}
          content={tip.content}
          likeCount={tip.likeCount}
        />
      ))}
    </div>
  );
};
