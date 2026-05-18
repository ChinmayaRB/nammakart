import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { User as UserIcon, Mail, Phone, MapPin, Package, Heart, CreditCard, LogOut, Settings, ShieldCheck, Sparkles, Edit3, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useAuth } from "@/store/auth";
import { useCart } from "@/store/cart";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Your Profile — NammaKart AI" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const nav = useNavigate();
  const { user, logout, update } = useAuth();
  const wishlistCount = useCart((s) => s.wishlist.length);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");

  useEffect(() => {
    if (!user) nav({ to: "/login" });
  }, [user, nav]);

  if (!user) return null;

  const initials = user.name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();

  const stats = [
    { label: "Orders", value: 24, icon: Package },
    { label: "Favorites", value: wishlistCount, icon: Heart },
    { label: "Saved", value: "₹3.2k", icon: Sparkles },
  ];

  const menu = [
    { icon: Package, label: "My Orders", desc: "Track and reorder", to: "/home" as const },
    { icon: Heart, label: "Favorites", desc: `${wishlistCount} saved items`, to: "/favorites" as const },
    { icon: MapPin, label: "Addresses", desc: "Manage delivery locations", to: "/profile" as const },
    { icon: CreditCard, label: "Payment methods", desc: "Cards, UPI & wallets", to: "/profile" as const },
    { icon: ShieldCheck, label: "Privacy & security", desc: "2FA, sessions, data", to: "/profile" as const },
    { icon: Settings, label: "Preferences", desc: "Notifications & language", to: "/profile" as const },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl gradient-hero p-8 text-primary-foreground shadow-soft"
        >
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="grid h-20 w-20 place-items-center rounded-2xl bg-white/20 font-display text-3xl font-bold backdrop-blur">
                {initials}
              </div>
              <div>
                {editing ? (
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-9 max-w-xs bg-white/20 text-primary-foreground placeholder:text-white/70"
                  />
                ) : (
                  <h1 className="font-display text-3xl font-bold">{user.name}</h1>
                )}
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm opacity-90">
                  <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />{user.email}</span>
                  {user.phone && <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" />{user.phone}</span>}
                </div>
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur">
                  <Sparkles className="h-3 w-3" /> Kart+ Member
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  if (editing) update({ name, phone });
                  setEditing((v) => !v);
                }}
              >
                {editing ? <><Check className="h-4 w-4" /> Save</> : <><Edit3 className="h-4 w-4" /> Edit</>}
              </Button>
              <Button variant="ghost" className="text-primary-foreground hover:bg-white/10" onClick={() => { logout(); nav({ to: "/" }); }}>
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
          </div>

          {editing && (
            <div className="relative mt-6 grid gap-3 md:grid-cols-2">
              <Input
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-10 bg-white/20 text-primary-foreground placeholder:text-white/70"
              />
            </div>
          )}
        </motion.div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{s.label}</span>
                <s.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="mt-2 font-display text-3xl font-bold">{s.value}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {menu.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to={m.to}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-soft"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <m.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{m.label}</div>
                  <div className="text-xs text-muted-foreground">{m.desc}</div>
                </div>
                <UserIcon className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
