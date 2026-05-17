import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, MapPin, CreditCard, Wallet, Smartphone, Banknote, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { useCart, cartTotals } from "@/store/cart";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () => ({ meta: [{ title: "Checkout — NammaKart AI" }] }),
});

const addresses = [
  { id: "home", label: "Home", line: "302, Indus Apartments, 80 Feet Rd, Indiranagar, Bengaluru 560038", eta: "8 min" },
  { id: "work", label: "Work", line: "WeWork Galaxy, Residency Rd, Bengaluru 560025", eta: "12 min" },
];

const methods = [
  { id: "upi", label: "UPI", desc: "GPay · PhonePe · Paytm", icon: Smartphone },
  { id: "card", label: "Cards", desc: "Visa · Mastercard · Rupay", icon: CreditCard },
  { id: "wallet", label: "Kart Wallet", desc: "Balance ₹2,140 · +10% cashback", icon: Wallet },
  { id: "cod", label: "Cash on delivery", desc: "Pay rider on arrival", icon: Banknote },
];

function CheckoutPage() {
  const { items, clear } = useCart();
  const t = cartTotals(items);
  const [addr, setAddr] = useState("home");
  const [method, setMethod] = useState("upi");
  const [placed, setPlaced] = useState(false);

  const placeOrder = () => {
    setPlaced(true);
    clear();
  };

  if (placed) {
    return (
      <>
        <SiteHeader />
        <main className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-3xl border border-border bg-card p-10 text-center shadow-elegant"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="mx-auto grid h-20 w-20 place-items-center rounded-full gradient-hero text-primary-foreground shadow-glow"
            >
              <CheckCircle2 className="h-10 w-10" />
            </motion.div>
            <h1 className="mt-6 font-display text-3xl font-bold">Order placed!</h1>
            <p className="mt-2 text-muted-foreground">Your rider is being dispatched · arriving in ~8 min</p>
            <div className="mt-6 rounded-2xl bg-muted p-4 text-left text-sm">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Order ID</p>
              <p className="font-display text-lg font-bold">#NK-{Math.floor(10000 + Math.random() * 90000)}</p>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <Link to="/home"><Button variant="outline" className="rounded-full">Keep shopping</Button></Link>
              <Link to="/"><Button className="rounded-full gradient-hero">Track order</Button></Link>
            </div>
          </motion.div>
        </main>
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6">
        <h1 className="font-display text-4xl font-bold">Checkout</h1>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            {/* Address */}
            <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold"><MapPin className="h-5 w-5 text-primary" /> Delivery address</h2>
              <div className="mt-4 space-y-2">
                {addresses.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setAddr(a.id)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all",
                      addr === a.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted",
                    )}
                  >
                    <span className={cn("mt-1 grid h-4 w-4 place-items-center rounded-full border-2", addr === a.id ? "border-primary" : "border-muted-foreground")}>
                      {addr === a.id && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-bold">{a.label} <span className="ml-2 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success">{a.eta}</span></p>
                      <p className="text-xs text-muted-foreground">{a.line}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Payment */}
            <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-lg font-bold">Payment method</h2>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {methods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border p-4 text-left transition-all",
                      method === m.id ? "border-primary bg-primary/5 shadow-soft" : "border-border hover:bg-muted",
                    )}
                  >
                    <div className={cn("grid h-10 w-10 place-items-center rounded-xl", method === m.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                      <m.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{m.label}</p>
                      <p className="text-xs text-muted-foreground">{m.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-display text-lg font-bold">Order summary</h3>
              <div className="mt-3 max-h-48 space-y-2 overflow-y-auto">
                {items.map(({ product, qty }) => (
                  <div key={product.id} className="flex items-center gap-2 text-xs">
                    <span className="text-lg">{product.emoji}</span>
                    <span className="flex-1 truncate">{product.name}</span>
                    <span className="text-muted-foreground">×{qty}</span>
                    <span className="font-semibold">₹{product.price * qty}</span>
                  </div>
                ))}
                {items.length === 0 && <p className="text-sm text-muted-foreground">No items — go add some 🛒</p>}
              </div>
              <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between"><dt>Subtotal</dt><dd>₹{t.subtotal}</dd></div>
                <div className="flex justify-between text-success"><dt>Savings</dt><dd>−₹{t.savings}</dd></div>
                <div className="flex justify-between"><dt>Delivery</dt><dd>{t.delivery === 0 ? "FREE" : `₹${t.delivery}`}</dd></div>
                <div className="flex justify-between border-t border-border pt-2 text-base font-bold"><dt>To pay</dt><dd className="font-display">₹{t.total}</dd></div>
              </dl>
              <Button size="lg" onClick={placeOrder} disabled={items.length === 0} className="mt-5 w-full rounded-full gradient-hero text-base font-semibold shadow-glow disabled:opacity-50">
                Place order · ₹{t.total}
              </Button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5" /> 256-bit secure checkout
              </p>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
