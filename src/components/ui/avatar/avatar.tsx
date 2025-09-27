import clsx from "clsx";
import Image from "next/image";

type AvatarProps = {
  name?: string;
  urlImage: string;
  className?: string
};

export const Avatar = ({ name, urlImage, className }: AvatarProps) => {
  if (!name) return <Image alt="use-avatar" src={urlImage} />;

  return (
    <div className={clsx("flex gap-4 items-center", className)}>
      <span className="font-bold">{name}</span>
      <Image alt="user-avatar" src={urlImage} width={60} height={60} className="rounded-full" />
    </div>
  );
};
