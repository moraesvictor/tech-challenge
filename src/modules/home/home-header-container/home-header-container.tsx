import { Button, BUTTON_VARIANTS } from "@/components";

export const HomeHeaderContainer = () => {
  return (
    <div className="w-full ">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex gap-5">
          {/* TODO: Adicionar LOGO do banco */}
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
