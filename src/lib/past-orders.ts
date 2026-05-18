import type { Product } from "./mock-data";
import { products } from "./mock-data";

export type PastOrderItem = { productId: string; qty: number };
export type PastOrder = {
  id: string;
  placedAt: string;
  status: "Delivered" | "Cancelled" | "Refunded";
  address: string;
  paymentMethod: string;
  items: PastOrderItem[];
  subtotal: number;
  delivery: number;
  total: number;
  deliveredInMin: number;
  rating?: number;
};

const mkItems = (entries: [string, number][]): PastOrderItem[] =>
  entries.map(([productId, qty]) => ({ productId, qty }));

const compute = (items: PastOrderItem[], delivery = 0) => {
  const subtotal = items.reduce((s, it) => {
    const p = products.find((x) => x.id === it.productId);
    return s + (p ? p.price * it.qty : 0);
  }, 0);
  return { subtotal, delivery, total: subtotal + delivery };
};

const build = (
  o: Omit<PastOrder, "subtotal" | "delivery" | "total"> & { delivery?: number },
): PastOrder => {
  const c = compute(o.items, o.delivery ?? 0);
  return { ...o, ...c };
};

export const pastOrders: PastOrder[] = [
  build({
    id: "NK-8418",
    placedAt: "2026-05-17T19:42:00Z",
    status: "Delivered",
    address: "12, Sona Towers, Indiranagar 100ft Rd",
    paymentMethod: "UPI · GPay",
    items: mkItems([["p1", 1], ["p8", 2], ["p9", 1], ["p12", 1]]),
    deliveredInMin: 7,
    rating: 5,
  }),
  build({
    id: "NK-8392",
    placedAt: "2026-05-15T08:11:00Z",
    status: "Delivered",
    address: "12, Sona Towers, Indiranagar 100ft Rd",
    paymentMethod: "Visa ··4821",
    items: mkItems([["p10", 1], ["p11", 2], ["p13", 1]]),
    deliveredInMin: 11,
    rating: 4,
  }),
  build({
    id: "NK-8276",
    placedAt: "2026-05-11T17:30:00Z",
    status: "Delivered",
    address: "Office — WeWork Galaxy, Residency Rd",
    paymentMethod: "Kart+ Wallet",
    items: mkItems([["p3", 1], ["p4", 1], ["p5", 1], ["p6", 2], ["p14", 1]]),
    deliveredInMin: 9,
    rating: 5,
  }),
  build({
    id: "NK-8154",
    placedAt: "2026-05-06T21:05:00Z",
    status: "Delivered",
    address: "12, Sona Towers, Indiranagar 100ft Rd",
    paymentMethod: "UPI · GPay",
    items: mkItems([["p15", 1], ["p7", 1], ["p16", 1]]),
    delivery: 25,
    deliveredInMin: 14,
  }),
  build({
    id: "NK-8023",
    placedAt: "2026-04-29T13:18:00Z",
    status: "Cancelled",
    address: "12, Sona Towers, Indiranagar 100ft Rd",
    paymentMethod: "UPI · GPay",
    items: mkItems([["p2", 2], ["p8", 1]]),
  }),
];

export const resolveItem = (item: PastOrderItem): { product: Product; qty: number } | null => {
  const product = products.find((p) => p.id === item.productId);
  return product ? { product, qty: item.qty } : null;
};
