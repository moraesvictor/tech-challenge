"use client";
import { useState, useEffect } from "react";

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

export const useDashboardWidgets = () => {
  const [widgets, setWidgets] = useState<DashboardWidget[]>(DEFAULT_WIDGETS);
  const [isLoaded, setIsLoaded] = useState(false);

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
      setIsLoaded(true);
    }
  }, []);

  const saveWidgets = (newWidgets: DashboardWidget[]) => {
    setWidgets(newWidgets);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newWidgets));
    }
  };

  const toggleWidget = (widget: DashboardWidget) => {
    const newWidgets = widgets.includes(widget)
      ? widgets.filter((w) => w !== widget)
      : [...widgets, widget];
    saveWidgets(newWidgets);
  };

  const resetWidgets = () => {
    saveWidgets(DEFAULT_WIDGETS);
  };

  return {
    widgets,
    isLoaded,
    toggleWidget,
    resetWidgets,
    saveWidgets,
  };
};
