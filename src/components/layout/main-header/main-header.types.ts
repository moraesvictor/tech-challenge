import { PropsWithChildren } from "react";

export type MainHeaderProps = {
  children: PropsWithChildren["children"];
  className?: string;
  color?: HEADER_COLORS
};

export enum HEADER_COLORS {
  dark = "dark",
  light = "light",
}