import { ButtonHTMLAttributes } from "react"

export enum BUTTON_VARIANTS {
  ghost = "ghost",
  alert = "alert",
  default = "default",
}

export type ButtonProps = {
  variant?: BUTTON_VARIANTS
} & ButtonHTMLAttributes<HTMLButtonElement> & { fullWidth?: boolean }