interface AvatarProps {
  src?: string;
  alt: string;
}

export const Avatar = ({ src, alt }: AvatarProps) => {
  if (!src) {
    // 画像がない場合はイニシャルを表示
    return (
      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
        {alt[0]?.toUpperCase() ?? "?"}
      </div>
    );
  }

  return (
    <img
      alt={alt}
      src={src}
      className="w-10 h-10 rounded-full object-cover"
    ></img>
  );
};
