import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TrendingUp, TrendingDown, Package, Users, IndianRupee, Truck, Brain, AlertTriangle, Search, Bell } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { categoryShare, liveOrders, revenueData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
  head: () => ({ meta: [{ title: "Operations dashboard — KnightKart" }] }),
});

const kpis = [
  { label: "Revenue today", value: "₹2,18,420", delta: "+18.2%", up: true, icon: IndianRupee, accent: "from-primary/20 to-primary/5" },
  { label: "Orders", value: "2,054", delta: "+12.4%", up: true, icon: Package, accent: "from-chart-2/20 to-chart-2/5" },
  { label: "Active users", value: "48,912", delta: "+6.1%", up: true, icon: Users, accent: "from-chart-3/20 to-chart-3/5" },
  { label: "Avg. delivery", value: "8.4 min", delta: "−0.9 min", up: true, icon: Truck, accent: "from-chart-4/20 to-chart-4/5" },
];

const statusStyle: Record<string, string> = {
  Packing: "bg-warning/15 text-warning",
  Picking: "bg-chart-3/15 text-chart-3",
  "Out for delivery": "bg-primary/15 text-primary",
  Delivered: "bg-success/15 text-success",
};

const COLORS = ["oklch(0.62 0.17 155)", "oklch(0.82 0.16 75)", "oklch(0.55 0.14 210)", "oklch(0.65 0.2 25)", "oklch(0.5 0.15 290)"];

function AdminDashboard() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6">
        {/* Top */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Live · Bengaluru hub</p>
            <h1 className="mt-1 font-display text-4xl font-bold">Operations overview</h1>
            <p className="mt-1 text-sm text-muted-foreground">Sunday, 17 May · 2:48 PM IST</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm md:flex">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input placeholder="Search orders, SKUs…" className="w-48 bg-transparent outline-none" />
              <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono">⌘K</kbd>
            </div>
            <button className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-card" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn("relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br p-5 shadow-soft", k.accent)}
            >
              <div className="flex items-start justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-card text-primary shadow-soft">
                  <k.icon className="h-5 w-5" />
                </div>
                <div className={cn("flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold", k.up ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive")}>
                  {k.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {k.delta}
                </div>
              </div>
              <p className="mt-5 text-xs uppercase tracking-wider text-muted-foreground">{k.label}</p>
              <p className="mt-1 font-display text-2xl font-bold">{k.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft lg:col-span-2"
          >
            <div className="flex items-end justify-between">
              <div>
                <h3 className="font-display text-lg font-bold">Revenue · last 7 days</h3>
                <p className="text-xs text-muted-foreground">Live cohort, all dark stores</p>
              </div>
              <p className="font-display text-2xl font-bold text-primary">₹12.1L</p>
            </div>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.62 0.17 155)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="oklch(0.62 0.17 155)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.85 0.01 140)" vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} tickFormatter={(v) => `₹${v / 1000}k`} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.9 0.012 140)", background: "oklch(1 0 0)" }} />
                  <Area type="monotone" dataKey="revenue" stroke="oklch(0.62 0.17 155)" strokeWidth={2.5} fill="url(#g1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft"
          >
            <h3 className="font-display text-lg font-bold">Category mix</h3>
            <p className="text-xs text-muted-foreground">Share of revenue</p>
            <div className="mt-2 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryShare} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                    {categoryShare.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.9 0.012 140)", background: "oklch(1 0 0)" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 space-y-1.5 text-xs">
              {categoryShare.map((c, i) => (
                <div key={c.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: COLORS[i] }} />
                    <span>{c.name}</span>
                  </div>
                  <span className="font-semibold">{c.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom row */}
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft lg:col-span-2"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Live orders</h3>
              <span className="flex items-center gap-1.5 text-xs text-success">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                Live
              </span>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="pb-3 font-medium">Order</th>
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Items</th>
                    <th className="pb-3 font-medium">Total</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">ETA</th>
                  </tr>
                </thead>
                <tbody>
                  {liveOrders.map((o, i) => (
                    <motion.tr
                      key={o.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35 + i * 0.04 }}
                      className="border-t border-border"
                    >
                      <td className="py-3 font-mono text-xs">{o.id}</td>
                      <td className="py-3"><div className="font-semibold">{o.customer}</div><div className="text-xs text-muted-foreground">{o.area}</div></td>
                      <td className="py-3">{o.items}</td>
                      <td className="py-3 font-semibold">₹{o.total}</td>
                      <td className="py-3"><span className={cn("rounded-full px-2 py-0.5 text-[11px] font-bold", statusStyle[o.status])}>{o.status}</span></td>
                      <td className="py-3 font-mono text-xs">{o.eta}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* AI insights */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="relative overflow-hidden rounded-3xl border border-border gradient-hero p-6 text-primary-foreground shadow-elegant"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
            <div className="relative flex items-center gap-2">
              <Brain className="h-5 w-5" />
              <h3 className="font-display text-lg font-bold">AI insights</h3>
            </div>
            <div className="relative mt-4 space-y-3">
              {[
                { icon: AlertTriangle, t: "Restock alert", d: "Alphonso mangoes will stock-out in 42 min at Indiranagar hub." },
                { icon: TrendingUp, t: "Demand surge", d: "Cold brew demand up 220% — recommend 2x inventory by Wed." },
                { icon: Truck, t: "Route optimized", d: "Cluster #7 saved 4.2 min/order with new sequencing." },
              ].map((x) => (
                <div key={x.t} className="rounded-2xl bg-white/15 p-3 backdrop-blur">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-90"><x.icon className="h-3.5 w-3.5" />{x.t}</div>
                  <p className="mt-1 text-sm">{x.d}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Hourly bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 rounded-3xl border border-border bg-card p-6 shadow-soft"
        >
          <h3 className="font-display text-lg font-bold">Orders by hour</h3>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.85 0.01 140)" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.9 0.012 140)", background: "oklch(1 0 0)" }} />
                <Bar dataKey="orders" fill="oklch(0.82 0.16 75)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </main>
    </>
  );
}
