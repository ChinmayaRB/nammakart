import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, Mail, Lock, User as UserIcon, ArrowRight, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/site-header";
import { useAuth } from "@/store/auth";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create account — NammaKart" },
      { name: "description", content: "Join NammaKart for 10-minute grocery delivery, AI bundles and member-only prices." },
    ],
  }),
  component: SignupPage,
});

const perks = [
  "Free delivery on first 5 orders",
  "AI-curated smart bundles",
  "Member-only flash deals",
];

function SignupPage() {
  const nav = useNavigate();
  const signup = useAuth((s) => s.signup);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!name || !email || password.length < 6) return setErr("Fill all fields (password 6+ chars)");
    setLoading(true);
    try {
      await signup(name, email, password);
      nav({ to: "/profile" });
    } catch {
      setErr("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong order-2 rounded-3xl p-8 shadow-soft md:order-1"
        >
          <h1 className="font-display text-3xl font-bold">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Start saving in seconds.</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <div className="relative">
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="name" placeholder="Priya Sharma" value={name} onChange={(e) => setName(e.target.value)} className="pl-9 h-11" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9 h-11" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type="password" placeholder="At least 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-9 h-11" />
              </div>
            </div>

            {err && <p className="text-sm text-destructive">{err}</p>}

            <Button type="submit" disabled={loading} className="h-11 w-full text-base">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Create account <ArrowRight className="h-4 w-4" /></>}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="order-1 flex flex-col justify-between rounded-3xl gradient-hero p-10 text-primary-foreground md:order-2"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <span className="font-display text-lg font-bold">Join NammaKart</span>
          </div>
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight">
              Your kitchen, restocked in 10 minutes.
            </h2>
            <ul className="mt-6 space-y-3 text-sm">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-white/20">
                    <Check className="h-3 w-3" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs opacity-80">By creating an account you agree to our Terms & Privacy.</p>
        </motion.div>
      </main>
    </div>
  );
}
