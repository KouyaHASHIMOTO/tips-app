interface AvatarProps {
  src?: string;
  alt: string;
}

export const Avatar = ({ src, alt }: AvatarProps) => {
  if (!src) {
    return (
      <div className="w-10 h-10 rounded-full bg-accent-light border border-border flex items-center justify-center text-accent font-bold text-sm">
        {alt[0]?.toUpperCase() ?? "?"}
      </div>
    );
  }

  return (
    <img
      alt={alt}
      src={src}
      className="w-10 h-10 rounded-full object-cover border border-border"
    />
  );
};
