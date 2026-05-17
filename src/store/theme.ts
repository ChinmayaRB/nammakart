import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeState = {
  theme: "light" | "dark";
  toggle: () => void;
  set: (t: "light" | "dark") => void;
};

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",
      toggle: () => set((s) => ({ theme: s.theme === "light" ? "dark" : "light" })),
      set: (t) => set({ theme: t }),
    }),
    { name: "nk-theme" },
  ),
);
