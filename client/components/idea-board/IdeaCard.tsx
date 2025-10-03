import { Button } from "@/components/ui/button";
import { Idea } from "@shared/api";
import { formatDistanceToNow } from "date-fns";
import { ArrowBigUp } from "lucide-react";

interface IdeaCardProps {
  idea: Idea;
  onUpvote: (ideaId: number) => void;
  isUpvoting: boolean;
}

const IdeaCard = ({ idea, onUpvote, isUpvoting }: IdeaCardProps) => {
  const createdAgo = formatDistanceToNow(new Date(idea.createdAt), {
    addSuffix: true,
  });

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-5 shadow-outline transition hover:border-primary/40">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary/80">Anonymous</p>
          <p className="mt-2 text-base font-medium text-foreground">{idea.text}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex h-auto min-w-[88px] items-center gap-1 rounded-full border-primary/30 bg-primary/5 text-xs font-semibold text-primary transition hover:bg-primary/10"
          onClick={() => onUpvote(idea.id)}
          disabled={isUpvoting}
        >
          <ArrowBigUp className="h-4 w-4" />
          {isUpvoting ? "Voting..." : idea.votes}
        </Button>
      </div>
      <footer className="mt-4 flex items-center justify-between text-xs text-foreground/50">
        <span>Added {createdAgo}</span>
        <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] uppercase tracking-wide text-primary">
          Idea spark
        </span>
      </footer>
    </article>
  );
};

export default IdeaCard;
