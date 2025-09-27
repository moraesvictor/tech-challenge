import { Button, BUTTON_VARIANTS } from "@/components";

export const HomeHeaderContainer = () => {
  return (
    <div className="flex items-center justify-between w-[100%] px-6">
      <div className="flex gap-5">
        {/* TODO: Adicionar LOGO do banco */}
        <span className="cursor-pointer text-white font-semibold">Sobre</span>
        <span className="cursor-pointer text-white font-semibold">Serviços</span>
      </div>
      <div className="flex gap-5">
        <Button>Abrir minha conta</Button>
        <Button variant={BUTTON_VARIANTS.ghost}>Já tenho conta</Button>
      </div>
    </div>
  );
};
