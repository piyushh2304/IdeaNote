import { cn } from "@/lib/utils";
import {
  BarChart3,
  GitBranchPlus,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    title: "Collaborative capture",
    description:
      "Add ideas in seconds with keyboard-first flows, intelligent summaries, and instant tagging.",
    icon: GitBranchPlus,
  },
  {
    title: "Signal-rich voting",
    description:
      "Stack ranked upvotes, heat-maps, and comment threads help you promote the strongest ideas.",
    icon: BarChart3,
  },
  {
    title: "Workflow ready",
    description:
      "Pipeline states, ready-to-launch checklists, and automation hooks keep momentum high.",
    icon: LayoutDashboard,
  },
  {
    title: "Enterprise secure",
    description:
      "SSO, audit-ready logs, and regional data residency ensure compliance for every team.",
    icon: ShieldCheck,
  },
];

const FeatureHighlights = () => {
  return (
    <section id="features" className="bg-background py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Designed for momentum
          </p>
          <h2 className="mt-3 text-3xl font-heading font-semibold text-foreground sm:text-4xl">
            Everything you need to elevate raw sparks into launch-ready plans.
          </h2>
          <p className="mt-4 text-base text-foreground/70 sm:text-lg">
            IdeaSpark unifies capture, evaluation, and rollout so your best thinking never gets lost in a document.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ title, description, icon: Icon }, index) => (
            <article
              key={title}
              className={cn(
                "group relative flex h-full flex-col rounded-3xl border border-border/60 bg-card/80 p-6 shadow-outline transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-brand",
                index === 1 && "md:translate-y-6",
                index === 2 && "lg:-translate-y-6",
              )}
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-6 text-xl font-semibold text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
