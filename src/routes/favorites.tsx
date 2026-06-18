import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/store/cart";
import { products } from "@/lib/mock-data";

export const Route = createFileRoute("/favorites")({
  head: () => ({ meta: [{ title: "Your Favorites — NammaKart" }] }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const wishlist = useCart((s) => s.wishlist);
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Heart className="h-3 w-3 fill-current" /> Your wishlist
            </div>
            <h1 className="mt-3 font-display text-4xl font-bold">Favorites</h1>
            <p className="mt-1 text-muted-foreground">
              {items.length} {items.length === 1 ? "item" : "items"} saved for later
            </p>
          </div>
          {items.length > 0 && (
            <Link to="/home">
              <Button variant="outline">
                <Sparkles className="h-4 w-4" /> Discover more
              </Button>
            </Link>
          )}
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass mt-12 grid place-items-center rounded-3xl py-20 text-center"
          >
            <div className="grid h-20 w-20 place-items-center rounded-2xl gradient-hero text-primary-foreground shadow-glow">
              <Heart className="h-9 w-9" />
            </div>
            <h2 className="mt-6 font-display text-2xl font-bold">No favorites yet</h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Tap the heart on any product to save it here for quick reordering later.
            </p>
            <Link to="/home" className="mt-6">
              <Button size="lg">
                <ShoppingBag className="h-4 w-4" /> Start shopping
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {items.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
