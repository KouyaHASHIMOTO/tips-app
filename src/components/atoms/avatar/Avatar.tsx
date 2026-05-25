interface AvatarProps  {
 src:string,
 alt:string
}

export const Avatar = ({src,alt}:AvatarProps) => {
  return <img alt={alt} src={src} className="w-10 h-10 rounded-full object-cover" ></img>;
};
