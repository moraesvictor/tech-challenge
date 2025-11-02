"use client";
import { useState } from "react";
import { parseCurrency } from "./currency-mask";

/**
 * Validador que retorna mensagem de erro ou null se válido
 */
type Validator = (value: string) => string | null;

/**
 * Biblioteca de validadores reutilizáveis
 */
export const validators: {
  required: Validator;
  email: Validator;
  minLength: (min: number) => Validator;
  maxLength: (max: number) => Validator;
  currency: Validator;
} = {
  /**
   * Verifica se o campo é obrigatório
   */
  required: (value: string): string | null => {
    if (!value?.trim()) {
      return "Este campo é obrigatório";
    }
    return null;
  },

  /**
   * Verifica se o email é válido
   */
  email: (value: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Email inválido";
    }
    return null;
  },

  /**
   * Verifica comprimento mínimo
   * @param min - Comprimento mínimo
   */
  minLength: (min: number) => (value: string): string | null => {
    if (value.length < min) {
      return `Mínimo de ${min} caracteres`;
    }
    return null;
  },

  /**
   * Verifica comprimento máximo
   * @param max - Comprimento máximo
   */
  maxLength: (max: number) => (value: string): string | null => {
    if (value.length > max) {
      return `Máximo de ${max} caracteres`;
    }
    return null;
  },

  /**
   * Verifica se o valor monetário é válido e maior que zero
   */
  currency: (value: string): string | null => {
    const numericValue = parseCurrency(value);
    if (numericValue <= 0) {
      return "Valor deve ser maior que zero";
    }
    return null;
  },
};

/**
 * Hook para validação de formulários
 */
export const useFormValidation = <T extends Record<string, string>>(
  rules: Partial<Record<keyof T, Array<Validator>>>
) => {
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validate = (data: T): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};

    Object.entries(rules).forEach(([field, fieldValidators]) => {
      if (!fieldValidators) return;

      const value = data[field as keyof T];
      for (const validator of fieldValidators) {
        const error = validator(value || "");
        if (error) {
          newErrors[field as keyof T] = error;
          break;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate, setErrors };
};

