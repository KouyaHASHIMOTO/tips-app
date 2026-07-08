interface FollowButtonProps {
  isFollowing?: boolean;
  onClick?: () => void;
}

export const FollowButton = ({
  isFollowing = false,
  onClick,
}: FollowButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
        isFollowing
          ? "border border-border text-text-sub hover:border-red-400 hover:text-red-400"
          : "bg-accent text-white hover:opacity-90"
      }`}
    >
      {isFollowing ? "フォロー済み" : "フォロー"}
    </button>
  );
};
