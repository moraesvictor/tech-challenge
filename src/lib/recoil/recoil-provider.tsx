"use client";
import { RecoilRoot } from "recoil";
import { ReactNode } from "react";

type RecoilProviderProps = {
  children: ReactNode;
};

export const RecoilProvider = ({ children }: RecoilProviderProps) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
