import { create } from "zustand";

export const useLanguageStore = create((set, get) => ({
  isHindi: true,
  changeLanguage: () => {
    set({ isHindi: !get().isHindi });
  },
}));
