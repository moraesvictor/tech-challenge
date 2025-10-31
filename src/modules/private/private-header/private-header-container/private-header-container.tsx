"use client";
import { useAuth } from "@/lib/indexedDb/auth-context";
import Image from "next/image";
import { PrivateHeaderSkeleton } from "./components/private-header-skeleton";
import { Button } from "@/components";
import { PrivateHeaderNavMenu } from "./components/private-header-nav-menu";
import { useState } from "react";

export const PrivateHeader = () => {
  const { currentUser, ready } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!ready) return <PrivateHeaderSkeleton />;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto flex items-center justify-between relative">
        <div className="relative w-32 h-10">
          <Image
            src="bytebank.svg"
            alt="logo-banco"
            width={0}
            height={0}
            style={{ width: "auto", height: "auto" }}
          />
        </div>

        <div className="hidden md:flex items-center gap-5">
          <PrivateHeaderNavMenu />
          {currentUser && (
            <div className="text-white font-medium flex gap-5 items-center">
              Área de {currentUser.username}
              <Button style={{ height: "2rem" }}>Sair</Button>
            </div>
          )}
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-1.5 p-2 text-white focus:outline-none z-50"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        <div
          className={`md:hidden fixed top-0 left-0 right-0 bottom-0 bg-cyan-900 z-40 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-20 px-6">
            <div className="flex flex-col gap-6">
              <PrivateHeaderNavMenu onLinkClick={closeMenu} />
              {currentUser && (
                <div className="text-white font-medium flex flex-col gap-5 pt-5 border-t border-cyan-700">
                  <span>Área de {currentUser.username}</span>
                  <Button style={{ height: "2rem" }} onClick={closeMenu}>
                    Sair
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
