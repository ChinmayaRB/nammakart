import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/categories")({
  component: CategoriesPage,
  head: () => ({ meta: [{ title: "Categories — KnightKart" }] }),
});

function CategoriesPage() {
  const [active, setActive] = useState(categories[0].id);
  const filtered = products.filter((p) => p.category === active);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6">
        <div>
          <h1 className="font-display text-4xl font-bold">All categories</h1>
          <p className="mt-2 text-muted-foreground">Browse every aisle of your nearest dark store.</p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible hide-scrollbar">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition-all",
                    active === c.id
                      ? "border-primary bg-primary/10 text-primary shadow-soft"
                      : "border-border bg-card hover:bg-muted",
                  )}
                >
                  <span className="text-xl">{c.emoji}</span>
                  <span className="text-sm font-semibold">{c.name}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Products */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filtered.length > 0 ? (
              filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)
            ) : (
              <div className="col-span-full rounded-3xl border border-dashed border-border bg-card p-16 text-center">
                <p className="text-5xl">📦</p>
                <p className="mt-3 font-display text-lg font-bold">Coming to this aisle soon.</p>
                <p className="text-sm text-muted-foreground">Our AI is sourcing this category for your area.</p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
