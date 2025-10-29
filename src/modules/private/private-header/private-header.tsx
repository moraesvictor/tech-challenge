"use client";
import { useAuth } from "@/lib/indexedDb/auth-context";
import Image from "next/image";
import { PrivateHeaderSkeleton } from "./private-header-skeleton";
import { Button } from "@/components";

export const PrivateHeader = () => {
  const { currentUser, ready } = useAuth();

  if (!ready) return <PrivateHeaderSkeleton />;

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
          <div className="text-white font-medium flex  gap-5 items-center">
             Área de {currentUser.username} 
             <Button style={{ height: '2rem'}}>Sair</Button>
          </div>
        )}
      </div>
    </div>
  );
};
