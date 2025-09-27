import Image from "next/image";

interface AdvantageCardProps {
  icon: string;
  title: string;
  description: string;
}

export const AdvantageCard = ({
  icon,
  title,
  description,
}: AdvantageCardProps) => (
  <div className="flex flex-col items-center text-center gap-2">
    <Image src={icon} alt={title} width={40} height={40} />
    <span className="font-semibold">{title}</span>
    <span className="text-gray-700">{description}</span>
  </div>
);
