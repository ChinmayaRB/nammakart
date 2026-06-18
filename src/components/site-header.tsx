import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, MapPin, Sun, Moon, Menu, X, Sparkles, Heart, LogIn } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/store/cart";
import { useTheme } from "@/store/theme";
import { useAuth } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/mock-data";

const nav = [
  { to: "/home", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/admin", label: "Dashboard" },
];

export function SiteHeader({ variant = "default" }: { variant?: "default" | "landing" }) {
  const items = useCart((s) => s.items);
  const wishCount = useCart((s) => s.wishlist.length);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const user = useAuth((s) => s.user);
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ⌘K / Ctrl+K to focus search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const suggestions = useMemo(() => {
    if (!q.trim()) return [];
    const needle = q.toLowerCase();
    return products
      .filter((p) => (p.name + " " + p.brand + " " + p.category).toLowerCase().includes(needle))
      .slice(0, 6);
  }, [q]);

  const submitSearch = (query: string) => {
    const term = query.trim();
    if (!term) return;
    try {
      const raw = localStorage.getItem("nk-recent-search");
      const list: string[] = raw ? JSON.parse(raw) : [];
      const next = [term, ...list.filter((x) => x !== term)].slice(0, 6);
      localStorage.setItem("nk-recent-search", JSON.stringify(next));
    } catch {}
    setFocused(false);
    setQ("");
    navigate({ to: "/home", search: { q: term } });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || variant === "default" ? "glass-strong shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 12, scale: 1.1 }}
            className="grid h-9 w-9 place-items-center rounded-xl gradient-hero text-primary-foreground shadow-glow"
          >
            <Sparkles className="h-5 w-5" />
          </motion.div>
          <span className="font-display text-lg font-bold tracking-tight">
            Namma<span className="text-gradient">Kart</span>
          </span>
        </Link>

        <div className="ml-2 hidden items-center gap-1 rounded-full bg-muted/60 px-3 py-1.5 text-xs lg:flex">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span className="font-medium">Delivery in 10 min</span>
          <span className="text-muted-foreground">· Indiranagar</span>
        </div>

        {/* Inline search */}
        <div className="relative ml-4 hidden flex-1 max-w-md md:block">
          <form
            onSubmit={(e) => { e.preventDefault(); submitSearch(q); }}
            className="flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5 focus-within:border-primary"
          >
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 120)}
              placeholder='Search items…  ⌘K'
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            {q && (
              <button type="button" onClick={() => setQ("")} className="text-muted-foreground hover:text-foreground" aria-label="Clear">
                <X className="h-4 w-4" />
              </button>
            )}
          </form>
          <AnimatePresence>
            {focused && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-2xl border border-border bg-popover shadow-elegant"
              >
                {suggestions.map((p) => (
                  <button
                    key={p.id}
                    onMouseDown={(e) => { e.preventDefault(); submitSearch(p.name); }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-muted"
                  >
                    <span className="text-xl">{p.emoji}</span>
                    <span className="flex-1 truncate">
                      <span className="font-medium">{p.name}</span>
                      <span className="ml-2 text-xs text-muted-foreground">{p.brand}</span>
                    </span>
                    <span className="text-xs font-semibold text-primary">₹{p.price}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {nav.map((n) => {
            const active = pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`relative rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1 md:ml-2">
          <Link to="/favorites" className="hidden md:block">
            <Button variant="ghost" size="icon" aria-label="Wishlist" className="relative">
              <Heart className="h-5 w-5" />
              {wishCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {wishCount}
                </span>
              )}
            </Button>
          </Link>
          <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggle}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid place-items-center"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </Button>
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </Link>
          {user ? (
            <Link to="/profile" className="hidden md:block">
              <Button variant="ghost" size="icon" aria-label="Account">
                <div className="grid h-7 w-7 place-items-center rounded-full gradient-hero text-[11px] font-bold text-primary-foreground">
                  {user.name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()}
                </div>
              </Button>
            </Link>
          ) : (
            <Link to="/login" className="hidden md:block">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <LogIn className="h-4 w-4" /> Sign in
              </Button>
            </Link>
          )}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="space-y-2 px-4 py-3">
              <form
                onSubmit={(e) => { e.preventDefault(); submitSearch(q); setOpen(false); }}
                className="flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-2"
              >
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search items…"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </form>
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
