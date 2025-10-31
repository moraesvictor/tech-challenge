"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type PrivateHeaderNavMenuProps = {
  onLinkClick?: () => void;
};

type MenuItem = {
  label: string;
  href: string;
};

const menuItems: MenuItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Transferências", href: "/transferencias" },
  { label: "Investimentos", href: "/investimentos" },
  { label: "Outros serviços", href: "/outros-servicos" },
];

export const PrivateHeaderNavMenu = ({
  onLinkClick,
}: PrivateHeaderNavMenuProps) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-2 pb-4 md:pb-0 border-b md:border-b-0 border-cyan-700 md:border-0">
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onLinkClick}
            className={`text-white hover:text-cyan-200 transition-colors relative pb-1 ${
              isActive ? "border-b-2 border-white" : ""
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};
