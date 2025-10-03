const footerLinks = [
  { label: "Privacy", href: "https://ideaspark.io/privacy" },
  { label: "Terms", href: "https://ideaspark.io/terms" },
  { label: "Support", href: "mailto:hello@ideaspark.io" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background/80">
      <div className="container flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">IdeaSpark</p>
          <p className="mt-2 max-w-md text-sm text-foreground/70">
            Building the fastest way for teams to capture, refine, and champion remarkable ideas.
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-foreground/70">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p className="text-xs text-foreground/60">© {currentYear} IdeaSpark Labs. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
