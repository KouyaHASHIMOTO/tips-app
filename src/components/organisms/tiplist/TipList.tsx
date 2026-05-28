import { TipCard } from "../../molecule/tipcard/TipCard";

interface TipListProps {
  tips: {
    id: number;
    title: string;
    user_id: string;
    content: string;
    created_at: string;
  }[];
}

export const TipList = ({ tips }: TipListProps) => {
  return (
    <div className="divide-y divide-gray-200">
      {tips.map((tip) => (
        <TipCard
          key={tip.id}
          title={tip.title}
          user_id={tip.user_id}
          content={tip.content}
          created_at={tip.created_at}
        />
      ))}
    </div>
  );
};
