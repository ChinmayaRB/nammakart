import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Package,
  Clock,
  MapPin,
  CreditCard,
  RotateCw,
  Check,
  Star,
  ChevronRight,
  Search,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useCart } from "@/store/cart";
import { pastOrders, resolveItem, type PastOrder } from "@/lib/past-orders";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Order History — NammaKart AI" },
      { name: "description", content: "Review your NammaKart AI past orders and reorder in one tap." },
    ],
  }),
  component: OrdersPage,
});

type Filter = "all" | "delivered" | "cancelled";

function OrdersPage() {
  const nav = useNavigate();
  const addMany = useCart((s) => s.addMany);
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");
  const [reorderedId, setReorderedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return pastOrders.filter((o) => {
      if (filter === "delivered" && o.status !== "Delivered") return false;
      if (filter === "cancelled" && o.status === "Delivered") return false;
      if (q) {
        const text = (o.id + " " + o.items.map((i) => i.productId).join(" ")).toLowerCase();
        if (!text.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [filter, q]);

  const totalSpent = pastOrders
    .filter((o) => o.status === "Delivered")
    .reduce((s, o) => s + o.total, 0);
  const deliveredCount = pastOrders.filter((o) => o.status === "Delivered").length;

  const reorder = (o: PastOrder, goCart = false) => {
    const entries = o.items.map(resolveItem).filter(Boolean) as { product: import("@/lib/mock-data").Product; qty: number }[];
    if (entries.length === 0) return;
    addMany(entries);
    setReorderedId(o.id);
    setTimeout(() => setReorderedId(null), 1800);
    if (goCart) nav({ to: "/cart" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Package className="h-3 w-3" /> Order history
            </div>
            <h1 className="mt-3 font-display text-4xl font-bold">Your orders</h1>
            <p className="mt-1 text-muted-foreground">
              {deliveredCount} delivered · ₹{totalSpent.toLocaleString("en-IN")} spent lifetime
            </p>
          </div>
          <Link to="/home">
            <Button variant="outline">
              <Sparkles className="h-4 w-4" /> Browse store
            </Button>
          </Link>
        </motion.div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1 rounded-full bg-muted/60 p-1">
            {(["all", "delivered", "cancelled"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition-colors ${
                  filter === f ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {filter === f && (
                  <motion.span
                    layoutId="orders-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {f}
              </button>
            ))}
          </div>
          <div className="relative max-w-xs flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search order id or item"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="h-10 pl-9"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="glass mt-10 grid place-items-center rounded-3xl py-20 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-2xl gradient-hero text-primary-foreground shadow-glow">
              <Package className="h-9 w-9" />
            </div>
            <h2 className="mt-6 font-display text-2xl font-bold">No orders to show</h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              When you place orders, they'll appear here for quick reorder.
            </p>
            <Link to="/home" className="mt-6">
              <Button size="lg">
                <ShoppingBag className="h-4 w-4" /> Start shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {filtered.map((o, i) => (
              <OrderCard
                key={o.id}
                order={o}
                index={i}
                onReorder={() => reorder(o)}
                onReorderCheckout={() => reorder(o, true)}
                justReordered={reorderedId === o.id}
              />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

function OrderCard({
  order,
  index,
  onReorder,
  onReorderCheckout,
  justReordered,
}: {
  order: PastOrder;
  index: number;
  onReorder: () => void;
  onReorderCheckout: () => void;
  justReordered: boolean;
}) {
  const [open, setOpen] = useState(false);
  const items = order.items.map(resolveItem).filter(Boolean) as {
    product: import("@/lib/mock-data").Product;
    qty: number;
  }[];
  const totalQty = items.reduce((s, i) => s + i.qty, 0);
  const date = new Date(order.placedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const time = new Date(order.placedAt).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });

  const statusColor =
    order.status === "Delivered"
      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      : order.status === "Cancelled"
      ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
      : "bg-amber-500/10 text-amber-600 dark:text-amber-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
    >
      <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex -space-x-3">
            {items.slice(0, 4).map((it) => (
              <div
                key={it.product.id}
                className="grid h-12 w-12 place-items-center rounded-xl border-2 border-card bg-muted text-xl shadow-sm"
                title={it.product.name}
              >
                {it.product.emoji}
              </div>
            ))}
            {items.length > 4 && (
              <div className="grid h-12 w-12 place-items-center rounded-xl border-2 border-card bg-primary/10 text-xs font-semibold text-primary">
                +{items.length - 4}
              </div>
            )}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-display text-lg font-bold">#{order.id}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusColor}`}>
                {order.status}
              </span>
              {order.rating && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                  <Star className="h-3 w-3 fill-current" /> {order.rating}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {date} · {time} · {totalQty} {totalQty === 1 ? "item" : "items"}
            </p>
            <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
              <MapPin className="mr-1 inline h-3 w-3" />
              {order.address}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <div className="text-right">
            <div className="font-display text-xl font-bold">₹{order.total.toLocaleString("en-IN")}</div>
            <div className="text-xs text-muted-foreground">
              {order.status === "Delivered" ? (
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3 text-primary" /> Delivered in {order.deliveredInMin} min
                </span>
              ) : (
                "Order " + order.status.toLowerCase()
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setOpen((v) => !v)}>
              {open ? "Hide" : "Details"}
              <ChevronRight className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-90" : ""}`} />
            </Button>
            <Button
              size="sm"
              onClick={onReorder}
              className={justReordered ? "bg-emerald-600 hover:bg-emerald-600" : ""}
            >
              {justReordered ? (
                <>
                  <Check className="h-3.5 w-3.5" /> Added
                </>
              ) : (
                <>
                  <RotateCw className="h-3.5 w-3.5" /> Reorder
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="border-t border-border bg-muted/30"
        >
          <div className="grid gap-6 p-5 md:grid-cols-[1fr_280px]">
            <div className="space-y-2">
              {items.map((it) => (
                <div
                  key={it.product.id}
                  className="flex items-center gap-3 rounded-xl bg-card p-3"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-muted text-xl">
                    {it.product.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{it.product.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {it.product.brand} · {it.product.unit}
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-semibold">×{it.qty}</div>
                    <div className="text-xs text-muted-foreground">
                      ₹{(it.product.price * it.qty).toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="rounded-xl bg-card p-4 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="mt-1.5 flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span>{order.delivery === 0 ? "Free" : `₹${order.delivery}`}</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-border pt-2 font-semibold">
                  <span>Total paid</span>
                  <span>₹{order.total.toLocaleString("en-IN")}</span>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CreditCard className="h-3 w-3" /> {order.paymentMethod}
                </div>
              </div>
              <Button className="w-full" onClick={onReorderCheckout}>
                <RotateCw className="h-4 w-4" /> Reorder & checkout
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
