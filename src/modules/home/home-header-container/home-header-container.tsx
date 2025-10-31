"use client";
import { HomeHeaderButtons } from "./components/home-header-buttons/home-header-buttons";
import Image from "next/image";
import { useState } from "react";
import { useModal } from "@/components/ui/modal/hooks/use-modal-context";
import { MoreAboutModal } from "./components/more-about-modal/more-about-modal";
import { ServicesInfoModal } from "./components/services-info-modal/services-info-modal";
import { Button } from "@/components";

export const HomeHeaderContainer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { open, close } = useModal();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openSobreModal = () => {
    open({
      title: "Sobre o ByteBank",
      content: <MoreAboutModal onClose={close} />,
    });
    closeMenu();
  };

  const openServicosModal = () => {
    open({
      title: "Nossos Serviços",
      content: <ServicesInfoModal onClose={close} />,
    });
    closeMenu();
  };

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto flex items-center justify-between relative">
        <div className="flex gap-5 items-center">
          <div className="relative w-32 h-10">
            <Image
              src="bytebank.svg"
              alt="logo-banco"
              width={0}
              height={0}
              style={{ width: "auto", height: "auto" }}
            />
          </div>
          <div className="hidden md:flex gap-5 items-center">
            <button
              onClick={openSobreModal}
              className="cursor-pointer text-white font-semibold text-xl hover:text-cyan-200 transition-colors"
            >
              Sobre
            </button>
            <button
              onClick={openServicosModal}
              className="cursor-pointer text-white font-semibold text-xl hover:text-cyan-200 transition-colors"
            >
              Serviços
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex">
            <HomeHeaderButtons />
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
        </div>

        <div
          className={`md:hidden fixed top-0 left-0 right-0 bottom-0 bg-cyan-900 z-40 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-20 px-6">
            <div className="flex flex-col gap-6">
              <Button
                onClick={openSobreModal}
                className="text-left text-white font-semibold text-xl hover:text-cyan-200 transition-colors"
              >
                Sobre
              </Button>
              <Button
                onClick={openServicosModal}
                className="text-left text-white font-semibold text-xl hover:text-cyan-200 transition-colors"
              >
                Serviços
              </Button>
              <div className="pt-5 border-t border-cyan-700 flex flex-col gap-4 justify-center w-full">
                <HomeHeaderButtons isVertical={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
