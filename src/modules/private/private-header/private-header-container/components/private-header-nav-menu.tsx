"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type PrivateHeaderNavMenuProps = {
  onLinkClick?: () => void;
};

type MenuItem = {
  label: string;
  href: string;
};

const menuItems: MenuItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Transações", href: "/transacoes" },
  { label: "Transferências", href: "/transferencias" },
  { label: "Investimentos", href: "/investimentos" },
];

export const PrivateHeaderNavMenu = ({
  onLinkClick,
}: PrivateHeaderNavMenuProps) => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col md:flex-row gap-4 md:gap-1 pb-4 md:pb-0 border-b md:border-b-0 border-cyan-700 md:border-0">
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onLinkClick}
            className={clsx(
              "relative text-sm font-medium transition-all duration-200 ease-in-out",
              "py-2 px-3 md:py-3 md:px-4",
              "text-white/80 hover:text-white",
              isActive &&
                "text-white font-semibold border-b-2 border-cyan-400 pb-[calc(0.75rem-2px)] md:pb-[calc(0.75rem-2px)]",
              !isActive && "hover:text-white/90"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
