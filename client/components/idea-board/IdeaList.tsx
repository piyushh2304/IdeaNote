import IdeaCard from "./IdeaCard";
import { Idea } from "@shared/api";

interface IdeaListProps {
  ideas: Idea[];
  onUpvote: (ideaId: number) => void;
  upvotingId: number | null;
}

const IdeaList = ({ ideas, onUpvote, upvotingId }: IdeaListProps) => {
  if (ideas.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border/70 bg-card/70 p-12 text-center shadow-outline">
        <p className="text-lg font-semibold text-foreground">Be the first to add an idea</p>
        <p className="mt-2 text-sm text-foreground/60">
          Share a spark above to inspire the next product breakthrough.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {ideas.map((idea) => (
        <IdeaCard
          key={idea.id}
          idea={idea}
          onUpvote={onUpvote}
          isUpvoting={upvotingId === idea.id}
        />
      ))}
    </div>
  );
};

export default IdeaList;
