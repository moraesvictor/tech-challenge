"use client";
import { useAuth } from "@/lib/indexedDb/auth-context";
import Image from "next/image";
import { PrivateHeaderSkeleton } from "./private-header-skeleton";

export const PrivateHeader = () => {
  const { currentUser, ready } = useAuth();

  if (!ready) return <PrivateHeaderSkeleton />;

  console.log("Current User:", currentUser);

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="relative w-32 h-10">
          <Image
            src="bytebank.svg"
            alt="logo-banco"
            width={0}
            height={0}
            style={{ width: "auto", height: "auto" }}
          />
        </div>
        {currentUser && (
          <div className="text-white font-medium">
            Olá, {currentUser.username}
          </div>
        )}
      </div>
    </div>
  );
};
