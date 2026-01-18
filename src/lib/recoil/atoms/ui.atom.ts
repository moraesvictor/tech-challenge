import { atom } from "recoil";

export const loadingAtom = atom<boolean>({
  key: "loadingAtom",
  default: false,
});

export const sidebarOpenAtom = atom<boolean>({
  key: "sidebarOpenAtom",
  default: false,
});
