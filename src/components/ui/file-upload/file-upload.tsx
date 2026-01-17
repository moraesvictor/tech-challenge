"use client";
import { useState, useRef } from "react";
import { FaUpload, FaFile, FaTimes } from "react-icons/fa";
import clsx from "clsx";

type FileUploadProps = {
  label?: string;
  accept?: string;
  maxSize?: number; 
  value?: string; 
  onChange?: (file: File | null, url: string | null) => void;
  errorLabel?: string;
  className?: string;
};

export const FileUpload = ({
  label,
  accept = "image/*,.pdf",
  maxSize = 5, 
  value,
  onChange,
  errorLabel,
  className,
}: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    setError("");

    // Validar tamanho
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setError(`O arquivo deve ter no máximo ${maxSize}MB`);
      return;
    }

    // Validar tipo
    const validTypes = accept.split(",").map((t) => t.trim());
    const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
    const isValidType =
      validTypes.some((type) => {
        if (type.startsWith(".")) {
          return `.${fileExtension}` === type;
        }
        if (type.includes("/*")) {
          const baseType = type.split("/")[0];
          return selectedFile.type.startsWith(baseType);
        }
        return selectedFile.type === type;
      }) || validTypes.includes(`.${fileExtension}`);

    if (!isValidType) {
      setError(`Tipo de arquivo não permitido. Aceitos: ${accept}`);
      return;
    }

    setFile(selectedFile);

    // Criar preview para imagens
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onChange?.(selectedFile, result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      // Para PDFs e outros, criar uma URL temporária
      const url = URL.createObjectURL(selectedFile);
      setPreview(url);
      onChange?.(selectedFile, url);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onChange?.(null, null);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const displayError = error || errorLabel;

  return (
    <div className={clsx("flex flex-col w-full", className)}>
      {label && (
        <label className="mb-1 font-medium text-gray-700">{label}</label>
      )}

      <div className="flex flex-col gap-2">
        {preview ? (
          <div className="relative border-2 border-dashed border-cyan-500 rounded-lg p-4 bg-cyan-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaFile className="text-cyan-600" size={24} />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    {file?.name || "Arquivo anexado"}
                  </span>
                  {file && (
                    <span className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemove}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Remover arquivo"
              >
                <FaTimes size={16} />
              </button>
            </div>
            {file?.type.startsWith("image/") && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 max-h-48 w-full object-contain rounded"
              />
            )}
          </div>
        ) : (
          <div
            onClick={handleClick}
            className={clsx(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              displayError
                ? "border-red-500 bg-red-50"
                : "border-gray-300 bg-gray-50 hover:border-cyan-500 hover:bg-cyan-50"
            )}
          >
            <FaUpload className="mx-auto text-gray-400 mb-2" size={32} />
            <p className="text-sm text-gray-600 mb-1">
              Clique para fazer upload ou arraste o arquivo aqui
            </p>
            <p className="text-xs text-gray-500">
              Aceitos: {accept} (máx. {maxSize}MB)
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          aria-label={label || "Upload de arquivo"}
        />
      </div>

      {displayError && (
        <p className="text-sm text-red-600 mt-1">{displayError}</p>
      )}
    </div>
  );
};
