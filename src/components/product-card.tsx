import { motion } from "framer-motion";
import { Plus, Star, Zap, Heart } from "lucide-react";
import type { Product } from "@/lib/mock-data";
import { useCart } from "@/store/cart";
import { cn } from "@/lib/utils";

const tagStyles: Record<string, string> = {
  Bestseller: "bg-primary/10 text-primary",
  New: "bg-chart-3/10 text-chart-3",
  Flash: "bg-destructive/10 text-destructive",
  Organic: "bg-success/15 text-success",
};

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add, items, setQty, wishlist, toggleWish } = useCart();
  const inCart = items.find((i) => i.product.id === product.id);
  const wished = wishlist.includes(product.id);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-soft transition-shadow hover:shadow-elegant"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-muted to-secondary/60">
        <motion.div
          whileHover={{ scale: 1.15, rotate: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="grid h-full place-items-center text-6xl"
        >
          <span>{product.emoji}</span>
        </motion.div>
        {product.tag && (
          <span className={cn("absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider", tagStyles[product.tag])}>
            {product.tag}
          </span>
        )}
        <button
          onClick={() => toggleWish(product.id)}
          aria-label="Wishlist"
          className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-card/80 text-muted-foreground backdrop-blur transition-colors hover:text-destructive"
        >
          <Heart className={cn("h-4 w-4", wished && "fill-destructive text-destructive")} />
        </button>
        <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-card/90 px-2 py-0.5 text-[10px] font-medium backdrop-blur">
          <Zap className="h-3 w-3 text-primary" />
          {product.eta}
        </div>
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{product.brand}</p>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug">{product.name}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">{product.unit}</p>
        <div className="mt-1 flex items-center gap-1 text-xs">
          <Star className="h-3 w-3 fill-warning text-warning" />
          <span className="font-medium">{product.rating}</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            <p className="font-display text-base font-bold">₹{product.price}</p>
            {discount > 0 && (
              <p className="text-[11px] text-muted-foreground">
                <span className="line-through">₹{product.mrp}</span>{" "}
                <span className="font-semibold text-success">{discount}% off</span>
              </p>
            )}
          </div>

          {inCart ? (
            <div className="flex items-center gap-1 rounded-full bg-primary text-primary-foreground">
              <button onClick={() => setQty(product.id, inCart.qty - 1)} className="h-8 w-8 text-base font-bold" aria-label="Decrease">−</button>
              <span className="min-w-5 text-center text-sm font-bold">{inCart.qty}</span>
              <button onClick={() => setQty(product.id, inCart.qty + 1)} className="h-8 w-8 text-base font-bold" aria-label="Increase">+</button>
            </div>
          ) : (
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => add(product)}
              className="flex h-9 items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-3 text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Plus className="h-3.5 w-3.5" />
              Add
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
