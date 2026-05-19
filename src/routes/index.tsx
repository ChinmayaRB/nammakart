import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles, Zap, Brain, ShieldCheck, Leaf, Truck, BarChart3, Smartphone, Apple, MessageSquare, Star } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { categories, testimonials } from "@/lib/mock-data";
import srkAmbassador from "@/assets/srk-ambassador.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "KnightKart — 10-min Groceries, AI-Smart" },
      { name: "description", content: "AI-powered instant grocery & smart commerce. Fresh produce delivered in 10 minutes." },
    ],
  }),
});

const stats = [
  { value: "10 min", label: "Avg. delivery" },
  { value: "12M+", label: "Orders shipped" },
  { value: "2,400+", label: "Dark stores" },
  { value: "4.9★", label: "App rating" },
];

const features = [
  { icon: Brain, title: "AI demand prediction", desc: "Our models forecast what your neighborhood wants — before you do.", className: "md:col-span-2 md:row-span-2" },
  { icon: Truck, title: "Hyper-local fleet", desc: "Riders dispatched in 90s.", className: "" },
  { icon: Leaf, title: "Farm-direct sourcing", desc: "Fresher, fairer, traceable.", className: "" },
  { icon: ShieldCheck, title: "Quality guaranteed", desc: "Free returns, no questions.", className: "md:col-span-2" },
  { icon: BarChart3, title: "Smart reorder", desc: "Auto-replenish staples on your rhythm.", className: "" },
  { icon: MessageSquare, title: "Kart Copilot", desc: "Chat-based shopping assistant.", className: "" },
];

const faqs = [
  { q: "How is delivery this fast?", a: "We operate hyper-local dark stores within 2km of every customer, so the cart is packed before you finish checking out." },
  { q: "Are prices higher for speed?", a: "No. We match supermarket pricing on staples and beat it on fresh produce via direct farm partnerships." },
  { q: "Where do you currently operate?", a: "Bengaluru, Hyderabad, Mumbai, Delhi NCR and Chennai. New cities every quarter." },
  { q: "What's KnightKart Pro?", a: "Free unlimited delivery, 10% extra cashback, and exclusive access to flash drops — for ₹99/month." },
];

function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <SiteHeader variant="landing" />

      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-32 top-40 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />
        </div>
        <motion.div style={{ y, opacity }} className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-2 lg:pt-20 lg:pb-28">
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              India's fastest AI grocery network
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mt-5 font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Groceries in <span className="text-gradient">10 minutes</span>.
              <br />
              Smarter every order.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 max-w-lg text-lg text-muted-foreground"
            >
              KnightKart learns your kitchen, predicts your week and stocks your dark store before you tap "add to cart".
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link to="/home">
                <Button size="lg" className="h-12 rounded-full gradient-hero px-7 text-base font-semibold shadow-glow hover:opacity-95">
                  Start shopping
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/admin">
                <Button size="lg" variant="outline" className="h-12 rounded-full px-7 text-base font-semibold">
                  Live dashboard
                </Button>
              </Link>
            </motion.div>

            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                >
                  <p className="font-display text-2xl font-bold sm:text-3xl">{s.value}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Hero visual: floating phone with product orbits */}
          <div className="relative mx-auto flex h-[440px] w-full max-w-md items-center justify-center lg:h-[560px]">
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 h-[420px] w-[230px] rounded-[44px] border-[10px] border-foreground/90 bg-card shadow-elegant lg:h-[520px] lg:w-[270px]"
            >
              <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-foreground/90" />
              <div className="h-full overflow-hidden rounded-[28px] gradient-hero p-4 text-primary-foreground">
                <div className="mt-6 flex items-center justify-between text-[10px]">
                  <span>9:41</span>
                  <span>● ●</span>
                </div>
                <p className="mt-3 text-[10px] uppercase opacity-80">Delivering to</p>
                <p className="text-sm font-bold">Indiranagar · 10 min</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {["🥭","🥑","🥛","🍓","🥖","🍫"].map((e, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.07 }}
                      className="grid h-16 place-items-center rounded-xl bg-white/15 text-2xl backdrop-blur"
                    >
                      {e}
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl bg-white/20 p-3 backdrop-blur">
                  <p className="text-[10px] opacity-80">AI predicts you'll need</p>
                  <p className="text-sm font-bold">Milk · Eggs · Bread</p>
                </div>
              </div>
            </motion.div>

            {/* Floating orbits */}
            {[
              { e: "🥕", x: -160, y: -120, d: 0 },
              { e: "🍅", x: 170, y: -80, d: 0.3 },
              { e: "🥚", x: -180, y: 60, d: 0.6 },
              { e: "🍞", x: 160, y: 140, d: 0.9 },
              { e: "🧀", x: -140, y: 180, d: 1.2 },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: [p.x, p.x + 10, p.x],
                  y: [p.y, p.y - 14, p.y],
                }}
                transition={{
                  opacity: { delay: 0.4 + i * 0.1 },
                  scale: { delay: 0.4 + i * 0.1, type: "spring" },
                  x: { duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: p.d },
                  y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: p.d },
                }}
                className="absolute grid h-16 w-16 place-items-center rounded-2xl glass-strong text-3xl shadow-elegant"
              >
                {p.e}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CATEGORY MARQUEE */}
      <section className="border-y border-border bg-card/40 py-6">
        <div className="flex gap-3 overflow-x-auto px-4 sm:px-6 lg:justify-center hide-scrollbar">
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/categories"
              className={`group flex shrink-0 items-center gap-2 rounded-full border border-border bg-gradient-to-br ${c.color} px-4 py-2 backdrop-blur transition-transform hover:scale-105`}
            >
              <span className="text-xl">{c.emoji}</span>
              <span className="text-sm font-semibold">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* BENTO FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Built different</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">An operating system for quick commerce.</h2>
          <p className="mt-4 text-muted-foreground">From the farm to your floor, every step is instrumented, predicted and optimized by AI.</p>
        </div>

        <div className="mt-14 grid auto-rows-[180px] grid-cols-1 gap-4 md:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-elegant ${f.className}`}
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/15" />
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">{f.title}</h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BRAND AMBASSADOR — SRK */}
      <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-gradient-to-br from-primary/15 via-card to-accent/15 shadow-elegant">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/25 blur-3xl" />

          <div className="relative grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <Sparkles className="h-3.5 w-3.5" /> Brand Ambassador
              </div>
              <h2 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl">
                "Picture <span className="text-gradient">abhi baaki hai</span> —
                <br /> aur groceries 10 minute mein."
              </h2>
              <p className="mt-5 max-w-lg text-muted-foreground">
                King Khan trusts <span className="font-semibold text-foreground">KnightKart</span> for his
                kitchen. From Mannat to your home — fresh produce, pantry staples, and late-night cravings,
                always 10 minutes away.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button size="lg" className="rounded-full shadow-glow" asChild>
                  <Link to="/home">Shop like SRK <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <div className="flex items-center gap-3 rounded-full border border-border bg-card/60 px-4 py-2 backdrop-blur">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <p className="text-xs font-semibold">"My family's favourite kart" — SRK</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto w-full max-w-md"
            >
              <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/40 to-accent/30 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/20 shadow-elegant">
                <img
                  src={srkAmbassador}
                  alt="Shah Rukh Khan — KnightKart brand ambassador"
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-black/40 px-4 py-3 backdrop-blur-xl">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">Brand Ambassador</p>
                    <p className="font-display text-sm font-bold text-white">Shah Rukh Khan</p>
                  </div>
                  <div className="rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                    Limited drop
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Loved by 12 million</p>
            <h2 className="mt-3 font-display text-4xl font-bold">Real kitchens, real reviews.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-3xl border border-border bg-card p-6 shadow-soft"
              >
                <div className="flex gap-0.5 text-warning">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-3 text-sm leading-relaxed">{t.quote}</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-muted text-xl">{t.avatar}</div>
                  <div>
                    <p className="text-sm font-bold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* APP DOWNLOAD */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border gradient-hero p-10 text-primary-foreground sm:p-16">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-80 w-80 rounded-full bg-accent/40 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">Get the app</p>
              <h2 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">
                Tap. Predict. Delivered.
              </h2>
              <p className="mt-4 max-w-md opacity-90">
                The full power of KnightKart in your pocket. Voice search, instant reorders, live tracking on a buttery map.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button className="flex items-center gap-3 rounded-2xl bg-foreground px-5 py-3 text-background">
                  <Apple className="h-6 w-6" />
                  <div className="text-left">
                    <p className="text-[10px] opacity-70">Download on</p>
                    <p className="font-display text-sm font-bold">App Store</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 rounded-2xl bg-foreground px-5 py-3 text-background">
                  <Smartphone className="h-6 w-6" />
                  <div className="text-left">
                    <p className="text-[10px] opacity-70">Get it on</p>
                    <p className="font-display text-sm font-bold">Google Play</p>
                  </div>
                </button>
              </div>
            </div>
            <div className="relative h-80">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute left-1/2 top-0 -translate-x-1/2 rounded-3xl glass-strong p-5 text-foreground shadow-elegant"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-2xl">⚡</div>
                  <div>
                    <p className="text-xs text-muted-foreground">Your order</p>
                    <p className="font-display text-base font-bold">Arriving in 4 min</p>
                  </div>
                </div>
                <div className="mt-3 h-2 w-64 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: "20%" }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                    className="h-full gradient-hero"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <h2 className="text-center font-display text-4xl font-bold">Questions, answered.</h2>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <motion.details
              key={f.q}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <summary className="flex cursor-pointer items-center justify-between text-base font-semibold">
                {f.q}
                <span className="ml-4 grid h-7 w-7 place-items-center rounded-full bg-muted text-lg transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </motion.details>
          ))}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
