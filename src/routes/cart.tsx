import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ArrowRight, ShoppingBag, Tag, Truck, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { useCart, cartTotals } from "@/store/cart";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({ meta: [{ title: "Your cart — NammaKart" }] }),
});

function CartPage() {
  const { items, setQty, remove } = useCart();
  const t = cartTotals(items);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6">
        <h1 className="font-display text-4xl font-bold">Your cart</h1>
        <p className="mt-2 text-muted-foreground">{items.length} item{items.length === 1 ? "" : "s"} · delivering in 10 min</p>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 rounded-3xl border border-dashed border-border bg-card p-16 text-center"
          >
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-primary/10 text-primary">
              <ShoppingBag className="h-10 w-10" />
            </div>
            <h2 className="mt-5 font-display text-2xl font-bold">Your cart is empty.</h2>
            <p className="mt-2 text-muted-foreground">Add some fresh picks — they'll arrive before your kettle boils.</p>
            <Link to="/home">
              <Button size="lg" className="mt-6 rounded-full gradient-hero shadow-glow">Start shopping</Button>
            </Link>
          </motion.div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {items.map(({ product, qty }) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft"
                  >
                    <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-muted to-secondary/60 text-3xl">
                      {product.emoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{product.brand}</p>
                      <p className="truncate text-sm font-semibold">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.unit} · {product.eta}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="font-display text-base font-bold">₹{product.price * qty}</p>
                      <div className="flex items-center gap-1 rounded-full bg-primary text-primary-foreground">
                        <button onClick={() => setQty(product.id, qty - 1)} className="h-7 w-7 text-base font-bold" aria-label="Decrease">−</button>
                        <span className="min-w-5 text-center text-xs font-bold">{qty}</span>
                        <button onClick={() => setQty(product.id, qty + 1)} className="h-7 w-7 text-base font-bold" aria-label="Increase">+</button>
                      </div>
                    </div>
                    <button onClick={() => remove(product.id)} className="ml-1 grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive" aria-label="Remove">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="flex items-center gap-3 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4">
                <Tag className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">Apply coupon</p>
                  <p className="text-xs text-muted-foreground">FRESH50 — extra ₹50 off on orders above ₹499</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-full">Apply</Button>
              </div>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <h3 className="font-display text-lg font-bold">Bill details</h3>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between"><dt>Items total</dt><dd className="line-through text-muted-foreground">₹{t.mrpTotal}</dd></div>
                  <div className="flex justify-between"><dt>Subtotal</dt><dd className="font-semibold">₹{t.subtotal}</dd></div>
                  <div className="flex justify-between text-success"><dt>You save</dt><dd>−₹{t.savings}</dd></div>
                  <div className="flex justify-between">
                    <dt>Delivery</dt>
                    <dd className="font-semibold">{t.delivery === 0 ? <span className="text-success">FREE</span> : `₹${t.delivery}`}</dd>
                  </div>
                  <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-bold">
                    <dt>To pay</dt>
                    <dd className="font-display">₹{t.total}</dd>
                  </div>
                </dl>
                <Link to="/checkout">
                  <Button size="lg" className="mt-5 w-full rounded-full gradient-hero text-base font-semibold shadow-glow">
                    Proceed to checkout
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 text-xs">
                <div className="flex items-center gap-2 text-success"><Truck className="h-4 w-4" /><span className="font-semibold">Delivery in 10 min</span></div>
                <div className="mt-2 flex items-center gap-2 text-muted-foreground"><ShieldCheck className="h-4 w-4" /><span>100% quality assured · easy refunds</span></div>
              </div>
            </aside>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
