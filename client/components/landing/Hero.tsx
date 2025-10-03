import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pb-24 pt-24 sm:pt-32">
      <div className="absolute inset-0 -z-10 bg-hero-radial" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background/60 to-background" aria-hidden />
      <div className="container relative grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Powered by live collaboration
          </span>
          <h1 className="mt-6 text-4xl font-heading font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Capture brilliant ideas the moment they happen.
          </h1>
          <p className="mt-6 max-w-xl text-base text-foreground/70 sm:text-lg">
            IdeaSpark helps teams move fast by transforming raw sparks into organized, upvotable threads. Collect inspiration, evaluate concepts with your team, and surface the ideas that deserve to ship next.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="gap-2 shadow-brand">
              <Link to="/app">
                Launch The Idea Board
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-border/70">
              <a href="#features">Explore the product</a>
            </Button>
          </div>
          <dl className="mt-12 grid max-w-2xl gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/70 bg-card/70 p-6 shadow-outline backdrop-blur">
              <dt className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
                Ideas shipped
              </dt>
              <dd className="mt-3 text-3xl font-heading font-semibold text-foreground">12k+</dd>
              <p className="mt-2 text-sm text-foreground/60">Teams around the world shipped launches inspired by IdeaSpark boards.</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card/70 p-6 shadow-outline backdrop-blur">
              <dt className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
                Time to consensus
              </dt>
              <dd className="mt-3 text-3xl font-heading font-semibold text-foreground">3× faster</dd>
              <p className="mt-2 text-sm text-foreground/60">Streamline prioritization with built-in voting and feedback loops.</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card/70 p-6 shadow-outline backdrop-blur">
              <dt className="text-xs font-semibold uppercase tracking-wide text-foreground/60">Innovation champions</dt>
              <dd className="mt-3 text-3xl font-heading font-semibold text-foreground">96%</dd>
              <p className="mt-2 text-sm text-foreground/60">Of orgs credit IdeaSpark for raising the visibility of bold ideas.</p>
            </div>
          </dl>
        </div>
        <div className="relative isolate">
          <div className="absolute inset-0 -z-10 rounded-3xl bg-primary/10 blur-3xl" aria-hidden />
          <div className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-2xl shadow-primary/20 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Product Studio</p>
                <p className="text-xs text-foreground/60">18 collaborators · Live</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                Synced
              </span>
            </div>
            <ul className="mt-6 space-y-4">
              {["Launch onboarding experiments", "Prototype AI-guided editor", "Reimagine success metrics"]
                .map((idea, index) => (
                  <li
                    key={idea}
                    className={cn(
                      "rounded-2xl border border-border/60 bg-card/80 p-4 shadow-outline transition hover:border-primary/50",
                      index === 1 && "border-primary/40 bg-primary/5",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-foreground">{idea}</p>
                        <p className="mt-1 text-sm text-foreground/60">
                          {index === 0 && "Drive activation by testing new welcome flows each sprint."}
                          {index === 1 && "Leverage AI-assisted nudges to keep ideas polished and vote-ready."}
                          {index === 2 && "Reset North Star metrics with a stronger signal on customer delight."}
                        </p>
                      </div>
                      <button className="flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        <Trophy className="h-3.5 w-3.5" />
                        {index === 0 && "24"}
                        {index === 1 && "56"}
                        {index === 2 && "17"}
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
