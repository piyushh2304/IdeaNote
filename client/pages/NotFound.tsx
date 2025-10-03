import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center bg-background">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Error 404
        </p>
        <h1 className="mt-4 text-4xl font-heading font-semibold text-foreground">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-3 text-base text-foreground/70">
          The link you followed may be broken, or the page may have been removed. Let&apos;s get you back to something inspiring.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="rounded-full border border-border bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Return home
          </Link>
          <Link
            to="/app"
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
          >
            Launch Idea Board
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
