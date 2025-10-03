import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface IdeaComposerProps {
  maxLength?: number;
  isSubmitting: boolean;
  onSubmit: (text: string) => Promise<boolean> | boolean;
}

const IdeaComposer = ({ maxLength = 280, isSubmitting, onSubmit }: IdeaComposerProps) => {
  const [value, setValue] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (!isSubmitting && hasSubmitted) {
      setValue("");
      setHasSubmitted(false);
    }
  }, [isSubmitting, hasSubmitted]);

  const remaining = maxLength - value.length;
  const isOverLimit = remaining < 0;
  const isInvalid = value.trim().length === 0 || isOverLimit;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isInvalid) return;
    const result = await onSubmit(value.trim());
    if (result) {
      setHasSubmitted(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-6 shadow-outline"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 font-heading text-sm font-semibold text-primary">
          ✨
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <label htmlFor="idea" className="text-sm font-semibold text-foreground">
              Share an idea
            </label>
            <p className="text-xs text-foreground/60">
              Keep it focused and clear—up to {maxLength} characters. Anonymous submissions let the best ideas shine.
            </p>
          </div>
          <textarea
            id="idea"
            name="idea"
            className="min-h-[120px] w-full resize-none rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm outline-none ring-offset-background placeholder:text-foreground/40 focus-visible:ring-2 focus-visible:ring-primary/50"
            placeholder="Pitch your spark..."
            maxLength={maxLength}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span
              className={cn(
                "text-xs font-medium",
                remaining <= 40 ? "text-primary" : "text-foreground/50",
                isOverLimit && "text-destructive",
              )}
            >
              {remaining >= 0
                ? `${remaining} characters remaining`
                : `${Math.abs(remaining)} characters over limit`}
            </span>
            <Button
              type="submit"
              size="lg"
              className="gap-2 self-end sm:self-auto"
              disabled={isInvalid || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit idea"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default IdeaComposer;
