import { Input } from "@/components/ui/input/input";

type TransferFormProps = {
  onChangeName: (value: string) => void;
  onChangeAccount: (value: string) => void;
  onChangeBank: (value: string) => void;
  onChangeAgency: (value: string) => void;
  onChangeValue: (value: string) => void;
};

type FieldConfig = {
  id: keyof TransferFormProps;
  label: string;
  placeholder: string;
  type?: string;
  currency?: boolean;
};

const fields: FieldConfig[] = [
  {
    id: "onChangeName",
    label: "Nome",
    placeholder: "Digite o nome do beneficiário",
    type: "text",
  },
  {
    id: "onChangeAccount",
    label: "Conta",
    placeholder: "digite a conta",
  },
  {
    id: "onChangeBank",
    label: "Banco",
    placeholder: "digite o banco",
  },
  {
    id: "onChangeAgency",
    label: "Ag",
    placeholder: "digite a agência",
  },
  {
    id: "onChangeValue",
    label: "Valor",
    placeholder: "digite o valor",
    currency: true,
  },
];

export const TransferForm = ({
  onChangeName,
  onChangeAccount,
  onChangeBank,
  onChangeAgency,
  onChangeValue,
}: TransferFormProps) => {
  const handlers: Record<keyof TransferFormProps, (value: string) => void> = {
    onChangeName,
    onChangeAccount,
    onChangeBank,
    onChangeAgency,
    onChangeValue,
  };

  const handleChange = (fieldId: keyof TransferFormProps) => {
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
