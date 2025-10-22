<<<<<<< Updated upstream
import { Button, BUTTON_VARIANTS } from "@/components";
=======
import Image from "next/image";
import { HomeHeaderButtons } from "./components/home-header-buttons/home-header-buttons";
>>>>>>> Stashed changes

export const HomeHeaderContainer = () => {
  return (
    <div className="w-full ">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex gap-5 items-center">
          {/* TODO: Adicionar LOGO do banco */}
          <Image
            src="bytebank.svg"
            alt="logo-banco"
            width={0}
            height={0}
            style={{ width: "auto", height: "auto" }}
          />
          <span className="cursor-pointer text-white font-semibold text-xl">
            Sobre
          </span>
          <span className="cursor-pointer text-white font-semibold text-xl">
            Serviços
          </span>
        </div>
        <div className="flex gap-5">
          <Button>Abrir minha conta</Button>
          <Button variant={BUTTON_VARIANTS.ghost}>Já tenho conta</Button>
        </div>
      </div>
    </div>
  );
};
