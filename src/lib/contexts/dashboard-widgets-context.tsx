"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type DashboardWidget = 
  | "balance-card"
  | "bank-statement"
  | "balance-chart"
  | "category-chart"
  | "financial-summary";

const DEFAULT_WIDGETS: DashboardWidget[] = [
  "balance-card",
  "bank-statement",
  "financial-summary",
  "balance-chart",
  "category-chart",
];

const STORAGE_KEY = "dashboard-widgets";

type DashboardWidgetsContextType = {
  widgets: DashboardWidget[];
  toggleWidget: (widget: DashboardWidget) => void;
  resetWidgets: () => void;
  saveWidgets: (newWidgets: DashboardWidget[]) => void;
};

const DashboardWidgetsContext = createContext<DashboardWidgetsContextType | undefined>(undefined);

export const DashboardWidgetsProvider = ({ children }: { children: ReactNode }) => {
  const [widgets, setWidgets] = useState<DashboardWidget[]>(DEFAULT_WIDGETS);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as DashboardWidget[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            setWidgets(parsed);
          }
        } catch (error) {
          console.error("Error loading dashboard widgets:", error);
        }
      }
      setIsInitialized(true);
    }
  }, []);

  const saveWidgets = (newWidgets: DashboardWidget[]) => {
    setWidgets(newWidgets);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newWidgets));
    }
  };

  const toggleWidget = (widget: DashboardWidget) => {
    setWidgets((current) => {
      const newWidgets = current.includes(widget)
        ? current.filter((w) => w !== widget)
        : [...current, widget];
      
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newWidgets));
      }
      
      return newWidgets;
    });
  };

  const resetWidgets = () => {
    setWidgets(DEFAULT_WIDGETS);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_WIDGETS));
    }
  };

  return (
    <DashboardWidgetsContext.Provider
      value={{
        widgets,
        toggleWidget,
        resetWidgets,
        saveWidgets,
      }}
    >
      {children}
    </DashboardWidgetsContext.Provider>
  );
};

export const useDashboardWidgets = () => {
  const context = useContext(DashboardWidgetsContext);
  if (context === undefined) {
    throw new Error("useDashboardWidgets must be used within a DashboardWidgetsProvider");
  }
  return {
    ...context,
    isLoaded: true,
  };
};
