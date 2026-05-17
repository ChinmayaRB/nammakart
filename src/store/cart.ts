import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/mock-data";

type CartItem = { product: Product; qty: number };

type CartState = {
  items: CartItem[];
  wishlist: string[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  toggleWish: (id: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      wishlist: [],
      add: (p) =>
        set((s) => {
          const found = s.items.find((i) => i.product.id === p.id);
          if (found) return { items: s.items.map((i) => (i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i)) };
          return { items: [...s.items, { product: p, qty: 1 }] };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.product.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          items: qty <= 0 ? s.items.filter((i) => i.product.id !== id) : s.items.map((i) => (i.product.id === id ? { ...i, qty } : i)),
        })),
      toggleWish: (id) =>
        set((s) => ({ wishlist: s.wishlist.includes(id) ? s.wishlist.filter((x) => x !== id) : [...s.wishlist, id] })),
      clear: () => set({ items: [] }),
    }),
    { name: "nk-cart" },
  ),
);

export const cartTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const mrpTotal = items.reduce((s, i) => s + i.product.mrp * i.qty, 0);
  const savings = mrpTotal - subtotal;
  const delivery = subtotal > 199 || subtotal === 0 ? 0 : 25;
  const total = subtotal + delivery;
  return { subtotal, mrpTotal, savings, delivery, total };
};
