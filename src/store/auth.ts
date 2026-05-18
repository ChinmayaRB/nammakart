import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  joined: string;
};

type AuthState = {
  user: User | null;
  login: (email: string, _password: string) => Promise<User>;
  signup: (name: string, email: string, _password: string) => Promise<User>;
  logout: () => void;
  update: (patch: Partial<User>) => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: async (email) => {
        await new Promise((r) => setTimeout(r, 600));
        const user: User = {
          name: email.split("@")[0].replace(/\b\w/g, (c) => c.toUpperCase()),
          email,
          joined: new Date().toISOString(),
        };
        set({ user });
        return user;
      },
      signup: async (name, email) => {
        await new Promise((r) => setTimeout(r, 700));
        const user: User = { name, email, joined: new Date().toISOString() };
        set({ user });
        return user;
      },
      logout: () => set({ user: null }),
      update: (patch) => set((s) => ({ user: s.user ? { ...s.user, ...patch } : s.user })),
    }),
    { name: "nk-auth" },
  ),
);
