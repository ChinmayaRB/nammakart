import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Search, Sparkles, Zap, TrendingUp, Mic } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/lib/mock-data";

export const Route = createFileRoute("/home")({
  component: HomePage,
  head: () => ({ meta: [{ title: "Shop fresh — NammaKart" }] }),
});

function HomePage() {
  const [q, setQ] = useState("");
  const trending = useMemo(() => products.filter((p) => p.tag === "Bestseller" || p.tag === "Flash"), []);
  const recommended = useMemo(() => products.slice(0, 8), []);
  const filtered = q
    ? products.filter((p) => (p.name + p.brand).toLowerCase().includes(q.toLowerCase()))
    : products;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong sticky top-16 z-30 -mx-4 flex items-center gap-3 rounded-none px-4 py-3 sm:mx-0 sm:rounded-2xl sm:px-4"
        >
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder='Search "alphonso mangoes", "cold brew"…'
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button aria-label="Voice search" className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
            <Mic className="h-4 w-4" />
          </button>
        </motion.div>

        {/* AI Banner */}
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl gradient-hero p-6 text-primary-foreground shadow-elegant lg:col-span-2"
          >
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
            <div className="relative flex items-start gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/20 backdrop-blur">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">AI suggested</p>
                <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">It's Sunday — restock weekly essentials?</h2>
                <p className="mt-1 max-w-md text-sm opacity-90">Milk, bread, eggs and bananas are typically running low by now. Add the smart bundle.</p>
                <button className="mt-4 rounded-full bg-foreground/95 px-5 py-2 text-sm font-bold text-background">
                  Add 4 essentials · ₹345
                </button>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft"
          >
            <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-accent/30 blur-3xl" />
            <div className="relative flex items-center gap-2 text-warning">
              <Zap className="h-5 w-5 fill-current" />
              <p className="text-xs font-bold uppercase tracking-wider">Flash drop · 23:14:08 left</p>
            </div>
            <h3 className="mt-2 font-display text-xl font-bold">Premium dairy at 30% off</h3>
            <p className="mt-1 text-sm text-muted-foreground">Limited inventory at your nearest dark store.</p>
            <div className="mt-4 flex -space-x-2 text-2xl">
              <span>🥛</span><span>🧀</span><span>🥚</span><span>🧈</span>
            </div>
          </motion.div>
        </div>

        {/* Categories */}
        <section className="mt-12">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold">Shop by category</h2>
            <Link to="/categories" className="text-sm font-semibold text-primary hover:underline">View all →</Link>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-10">
            {categories.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Link
                  to="/categories"
                  className={`flex flex-col items-center gap-2 rounded-2xl border border-border bg-gradient-to-br ${c.color} p-3 backdrop-blur transition-transform hover:scale-105`}
                >
                  <span className="text-3xl">{c.emoji}</span>
                  <span className="text-center text-[11px] font-semibold leading-tight">{c.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trending */}
        <section className="mt-14">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="font-display text-2xl font-bold">Trending in your area</h2>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {trending.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>

        {/* All / search results */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold">
            {q ? `Results for "${q}"` : "Recommended for you"}
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {(q ? filtered : recommended).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
          {q && filtered.length === 0 && (
            <div className="mt-10 rounded-3xl border border-dashed border-border bg-card p-12 text-center">
              <p className="text-5xl">🔍</p>
              <p className="mt-3 font-display text-lg font-bold">No matches — yet.</p>
              <p className="text-sm text-muted-foreground">We'll let your dark store know to stock it.</p>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
