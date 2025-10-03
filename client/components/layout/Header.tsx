import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Lightbulb, Menu } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#cta" },
  { label: "Idea Board", href: "/app" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAnchorClick = (hash: string) => {
    const elementId = hash.replace("#", "");
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="container flex items-center justify-between py-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-heading font-semibold"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Lightbulb className="h-5 w-5" />
          </span>
          IdeaSpark
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/80 md:flex">
          {navItems.map((item) =>
            item.href.startsWith("#") ? (
              <button
                key={item.label}
                type="button"
                className="relative transition-colors hover:text-foreground"
                onClick={() => handleAnchorClick(item.href)}
              >
                {item.label}
              </button>
            ) : (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "relative transition-colors hover:text-foreground",
                    isActive && "text-primary",
                  )
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>
        <div className="hidden md:flex">
          <Button asChild size="lg" className="gap-2 shadow-brand">
            <Link to="/app">Launch The Idea Board</Link>
          </Button>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-border bg-background p-2 text-foreground shadow-sm transition hover:bg-accent hover:text-accent-foreground md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>
      {isMenuOpen && (
        <div className="border-t border-border/60 bg-background/95 md:hidden">
          <nav className="container flex flex-col gap-4 py-6 text-sm font-medium">
            {navItems.map((item) =>
              item.href.startsWith("#") ? (
                <button
                  key={item.label}
                  type="button"
                  className="text-left transition-colors hover:text-foreground"
                  onClick={() => {
                    setIsMenuOpen(false);
                    requestAnimationFrame(() => handleAnchorClick(item.href));
                  }}
                >
                  {item.label}
                </button>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "transition-colors hover:text-foreground",
                      isActive && "text-primary",
                    )
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ),
            )}
            <Button asChild size="lg" className="justify-center">
              <Link to="/app">Launch The Idea Board</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
