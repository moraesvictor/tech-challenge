import Image from "next/image";

type AvatarProps = {
  name?: string;
  urlImage: string;
};

export const Avatar = ({ name, urlImage }: AvatarProps) => {
  if (!name) return <Image alt="use-avatar" src={urlImage} />;

  return (
    <div className="flex gap-1">
      <span className="font-bold">{name}</span>
      <Image alt="use-avatar" src={urlImage} />
    </div>
  );
};
