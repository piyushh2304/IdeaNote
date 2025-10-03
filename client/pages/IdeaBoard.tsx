import IdeaComposer from "@/components/idea-board/IdeaComposer";
import IdeaList from "@/components/idea-board/IdeaList";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Idea, IdeaCreateRequest, IdeaResponse, IdeasResponse } from "@shared/api";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { format, formatDistanceToNow } from "date-fns";
import {
  Activity,
  LightbulbIcon,
  Loader2,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";

const getErrorMessage = async (response: Response, fallback: string) => {
  const raw = await response.text();
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw) as { message?: string };
    if (parsed?.message) {
      return parsed.message;
    }
  } catch (error) {
    // no-op, fall through to raw string
  }
  return raw;
};

const fetchIdeas = async (): Promise<Idea[]> => {
  const response = await fetch("/api/ideas");
  if (!response.ok) {
    const message = await getErrorMessage(response, "Failed to load ideas");
    throw new Error(message);
  }
  const data = (await response.json()) as IdeasResponse;
  return data.ideas;
};

const createIdea = async (payload: IdeaCreateRequest): Promise<Idea> => {
  const response = await fetch("/api/ideas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await getErrorMessage(response, "Unable to submit idea");
    throw new Error(message);
  }

  const data = (await response.json()) as IdeaResponse;
  return data.idea;
};

const upvoteIdea = async (ideaId: number): Promise<Idea> => {
  const response = await fetch(`/api/ideas/${ideaId}/upvote`, {
    method: "POST",
  });

  if (!response.ok) {
    const message = await getErrorMessage(response, "Unable to upvote idea");
    throw new Error(message);
  }

  const data = (await response.json()) as IdeaResponse;
  return data.idea;
};

const IdeaBoard = () => {
  const queryClient = useQueryClient();
  const [activeUpvoteId, setActiveUpvoteId] = useState<number | null>(null);

  const {
    data: ideas = [],
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["ideas"],
    queryFn: fetchIdeas,
    refetchInterval: 15000,
  });

  const createMutation = useMutation({
    mutationFn: createIdea,
    onSuccess: (idea) => {
      queryClient.setQueryData<Idea[]>(["ideas"], (previous) =>
        previous ? [idea, ...previous] : [idea],
      );
      toast({
        title: "Idea submitted",
        description: "Your spark is now live for the team to upvote.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Could not submit idea",
        description: error.message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
    },
  });

  const upvoteMutation = useMutation({
    mutationFn: upvoteIdea,
    onMutate: async (ideaId: number) => {
      setActiveUpvoteId(ideaId);
      await queryClient.cancelQueries({ queryKey: ["ideas"] });
      const previousIdeas = queryClient.getQueryData<Idea[]>(["ideas"]);
      if (previousIdeas) {
        queryClient.setQueryData<Idea[]>(["ideas"], () =>
          previousIdeas.map((idea) =>
            idea.id === ideaId
              ? { ...idea, votes: idea.votes + 1 }
              : idea,
          ),
        );
      }
      return { previousIdeas };
    },
    onError: (error: Error, _variables, context) => {
      if (context?.previousIdeas) {
        queryClient.setQueryData(["ideas"], context.previousIdeas);
      }
      toast({
        title: "Could not upvote",
        description: error.message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      setActiveUpvoteId(null);
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
    },
  });

  const handleIdeaSubmit = async (text: string) => {
    try {
      await createMutation.mutateAsync({ text });
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleUpvote = (ideaId: number) => {
    upvoteMutation.mutate(ideaId);
  };

  const totalVotes = useMemo(
    () => ideas.reduce((sum, idea) => sum + idea.votes, 0),
    [ideas],
  );

  const mostRecentIdea = ideas[0];
  const topIdea = useMemo(() => {
    return ideas.reduce<Idea | undefined>((winner, idea) => {
      if (!winner) return idea;
      return idea.votes > winner.votes ? idea : winner;
    }, undefined);
  }, [ideas]);

  return (
    <section className="bg-background py-24">
      <div className="container grid gap-12 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:items-start">
        <div className="space-y-10">
          <div className="rounded-3xl border border-border/60 bg-card/80 p-8 shadow-brand">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              The Idea Board
            </p>
            <h1 className="mt-5 text-4xl font-heading font-semibold text-foreground">
              Capture, evaluate, and champion bold ideas in real time.
            </h1>
            <p className="mt-4 max-w-3xl text-base text-foreground/70">
              Share this link with anyone on your team. Every entry is anonymous, capped at 280 characters, and instantly visible for upvotes. It&apos;s the fastest way to surface the ideas worth building next.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border/60 bg-background/70 p-4 text-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
                  Total ideas
                </p>
                <p className="mt-2 text-2xl font-heading font-semibold text-foreground">{ideas.length}</p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/70 p-4 text-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
                  Votes cast
                </p>
                <p className="mt-2 text-2xl font-heading font-semibold text-foreground">{totalVotes}</p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/70 p-4 text-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
                  Last update
                </p>
                <p className="mt-2 text-2xl font-heading font-semibold text-foreground">
                  {ideas.length > 0
                    ? format(new Date(ideas[0].createdAt), "MMM d")
                    : "—"}
                </p>
              </div>
            </div>
          </div>

          <IdeaComposer
            isSubmitting={createMutation.isPending}
            onSubmit={handleIdeaSubmit}
          />

          <div className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-outline">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
              <div>
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  Community ideas
                </h2>
                <p className="text-sm text-foreground/60">
                  Sorted by newest first. Upvote the sparks you want to see explored.
                </p>
              </div>
              <div className="flex items-center gap-2">
                {isFetching && !isLoading && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => refetch()}
                >
                  <RotateCcw className="h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </div>
            <div className="mt-6">
              {isLoading ? (
                <div className="flex flex-col items-center gap-4 py-16 text-center text-sm text-foreground/60">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  Loading the latest idea sparks...
                </div>
              ) : isError ? (
                <div className="flex flex-col items-center gap-4 py-16 text-center text-sm text-destructive">
                  <LightbulbIcon className="h-6 w-6" />
                  We couldn&apos;t load the idea board right now. Please try again.
                  <Button variant="outline" size="sm" onClick={() => refetch()}>
                    Retry
                  </Button>
                </div>
              ) : (
                <IdeaList
                  ideas={ideas}
                  onUpvote={handleUpvote}
                  upvotingId={activeUpvoteId}
                />
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-outline">
            <h2 className="text-lg font-heading font-semibold text-foreground">
              Spotlight
            </h2>
            {topIdea ? (
              <div className="mt-4 space-y-3 text-sm text-foreground/70">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Leading idea
                </p>
                <p className="text-base font-medium text-foreground">{topIdea.text}</p>
                <p className="text-xs text-foreground/60">{topIdea.votes} total upvotes</p>
              </div>
            ) : (
              <p className="mt-4 text-sm text-foreground/60">
                No ideas yet—be the first to spark something.
              </p>
            )}
          </div>

          <div className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-outline">
            <h2 className="text-lg font-heading font-semibold text-foreground">
              Board activity
            </h2>
            <ul className="mt-4 space-y-4 text-sm text-foreground/70">
              <li className="flex items-start gap-3">
                <Activity className="mt-0.5 h-4 w-4 text-primary" />
                <span>
                  {totalVotes} upvotes cast. The community is rallying behind the top sparks.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-4 w-4 text-primary" />
                <span>
                  {ideas.length} ideas collected. New ideas appear at the top instantly.
                </span>
              </li>
              {mostRecentIdea && (
                <li className="flex items-start gap-3">
                  <LightbulbIcon className="mt-0.5 h-4 w-4 text-primary" />
                  <span>
                    Latest submission added {formatDistanceToNow(new Date(mostRecentIdea.createdAt), { addSuffix: true })}.
                  </span>
                </li>
              )}
            </ul>
          </div>

          <div className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-outline">
            <h2 className="text-lg font-heading font-semibold text-foreground">
              How it works
            </h2>
            <ol className="mt-4 space-y-3 text-sm text-foreground/70">
              <li>1. Share the link with your team and collect anonymous ideas.</li>
              <li>2. Upvote and discuss the sparks that feel promising.</li>
              <li>3. Promote winners into your delivery roadmap with confidence.</li>
            </ol>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default IdeaBoard;
