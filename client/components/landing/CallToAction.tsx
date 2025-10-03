import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section id="cta" className="py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 px-8 py-16 shadow-brand">
          <div className="absolute -left-24 top-1/2 hidden h-64 w-64 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl lg:block" aria-hidden />
          <div className="absolute -right-24 top-1/2 hidden h-72 w-72 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl lg:block" aria-hidden />
          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                <MessageCircle className="h-3.5 w-3.5" />
                Join our private beta
              </p>
              <h2 className="mt-4 text-3xl font-heading font-semibold text-foreground sm:text-4xl">
                Bring the Idea Board to your next sprint planning session.
              </h2>
              <p className="mt-3 text-base text-foreground/70 sm:text-lg">
                Start collecting feedback, upvotes, and insights from the entire team in one live canvas. No accounts, no friction—just instant collaboration.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link to="/app">
                  Launch Idea Board
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-border/70">
                <a href="mailto:hello@ideaspark.io?subject=Guided%20tour%20request">Request a guided tour</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
