import { Input } from "@/components/ui/input/input";

type PixFormProps = {
  onChangeKeyPix: (value: string) => void;
  onChangeValue: (value: string) => void;
};

type FieldConfig = {
  id: keyof PixFormProps;
  label: string;
  placeholder: string;
  type?: string;
  currency?: boolean;
};

const fields: FieldConfig[] = [
  {
    id: "onChangeKeyPix",
    label: "Chave pix",
    placeholder: "Digite a chave PIX",
    type: "text",
  },
  {
    id: "onChangeValue",
    label: "Valor",
    placeholder: "digite o valor",
    currency: true,
  },
];

export const PixForm = ({ onChangeKeyPix, onChangeValue }: PixFormProps) => {
  const handlers: Record<keyof PixFormProps, (value: string) => void> = {
    onChangeKeyPix,
    onChangeValue,
  };

  const handleChange = (fieldId: keyof PixFormProps) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      handlers[fieldId](e.target.value);
    };
  };

  return (
    <div className="flex flex-col gap-2">
      {fields.map((field) => (
        <div key={field.id} className="flex items-center gap-2">
          <span className="text-sm text-gray-500 w-12 shrink-0">
            {field.label}
          </span>
          <Input
            type={field.type}
            placeholder={field.placeholder}
            currency={field.currency}
            onChange={handleChange(field.id)}
          />
        </div>
      ))}
    </div>
  );
};
