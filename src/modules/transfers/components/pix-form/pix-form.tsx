import { Input } from "@/components/ui/input/input";

type PixFormProps = {
  onChangeKeyPix: (value: string) => void;
  onChangeValue: (value: string) => void;
};

export const PixForm = ({ onChangeKeyPix, onChangeValue }: PixFormProps) => {
  const handleChangeKeyPix = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeKeyPix(e.target.value);
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeValue(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 w-12 shrink-0">Chave pix</span>
        <Input
          type="text"
          placeholder="Digite a chave PIX"
          onChange={handleChangeKeyPix}
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 w-12 shrink-0">Valor</span>
        <Input
          currency
          placeholder="digite o valor"
          onChange={handleChangeValue}
        />
      </div>
    </div>
  );
};
