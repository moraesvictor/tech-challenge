"use client";
import { useState, useCallback, useEffect } from "react";
import { applyCurrencyMask, parseCurrency } from "@/lib/utils/currency-mask";

export const useCurrencyMask = (externalValue?: string | number) => {
  const [displayValue, setDisplayValue] = useState<string>(() => {
    if (externalValue === undefined || externalValue === null) {
      return "R$ 0,00";
    }
    return typeof externalValue === "string" 
      ? applyCurrencyMask(externalValue) 
      : applyCurrencyMask(String(externalValue));
  });

  useEffect(() => {
    if (externalValue !== undefined && externalValue !== null) {
      const formatted = applyCurrencyMask(String(externalValue));
      setDisplayValue((prev) => {
        if (prev !== formatted) {
          return formatted;
        }
        return prev;
      });
    }
  }, [externalValue]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formatted = applyCurrencyMask(inputValue);
    setDisplayValue(formatted);
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const formatted = applyCurrencyMask(e.target.value);
    setDisplayValue(formatted);
  }, []);

  const getNumericValue = useCallback((): number => {
    return parseCurrency(displayValue);
  }, [displayValue]);

  return {
    displayValue,
    handleChange,
    handleBlur,
    getNumericValue,
  };
};

