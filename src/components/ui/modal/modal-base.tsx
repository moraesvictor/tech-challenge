type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
};

export const ModalBase = ({ isOpen, onClose, children, title }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-lg p-12 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="mb-4 text-center">
          <span className="font-semibold text-2xl text-cyan-800">{title}</span>
        </header>
        {children}
      </div>
    </div>
  );
};
