import { Link } from "@tanstack/react-router";
import { Sparkles, Instagram, Twitter, Github, Linkedin } from "lucide-react";

const cols = [
  { title: "Shop", links: ["Fruits & Veg", "Dairy", "Snacks", "Beverages", "Bakery"] },
  { title: "Company", links: ["About", "Careers", "Press", "Sustainability", "Investors"] },
  { title: "Partners", links: ["Sell on Kart", "Delivery Partner", "Vendor Portal", "API"] },
  { title: "Help", links: ["Order Support", "Refunds", "FAQs", "Contact"] },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl gradient-hero text-primary-foreground shadow-glow">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="font-display text-lg font-bold">
                Namma<span className="text-gradient">Kart</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              AI-powered instant grocery & smart commerce. Built for India's fastest cities.
            </p>
            <div className="mt-6 flex gap-2">
              {[Instagram, Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full bg-card text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground" aria-label="social">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display text-sm font-semibold">{c.title}</h4>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© 2026 NammaKart Technologies Pvt Ltd. Crafted in Bengaluru.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
