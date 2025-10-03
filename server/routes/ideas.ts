import type { RequestHandler } from "express";
import { z } from "zod";

import {
  incrementIdeaVotes,
  insertIdea,
  listAllIdeas,
} from "../db/sqlite";

const storedIdeaSchema = z.object({
  id: z.number().int().positive(),
  text: z.string(),
  votes: z.number().int().nonnegative(),
  created_at: z.string(),
});

const createIdeaSchema = z.object({
  text: z.string().min(1).max(280),
});

const toIdeaResponse = (record: z.infer<typeof storedIdeaSchema>) => ({
  id: record.id,
  text: record.text,
  votes: record.votes,
  createdAt: record.created_at,
});

export const listIdeas: RequestHandler = async (_req, res, next) => {
  try {
    const rows = await listAllIdeas();
    const ideas = rows.map((row) => toIdeaResponse(storedIdeaSchema.parse(row)));
    res.json({ ideas });
  } catch (error) {
    next(error);
  }
};

export const createIdea: RequestHandler = async (req, res, next) => {
  try {
    const payload = createIdeaSchema.parse(req.body);
    const inserted = await insertIdea(payload.text);
    const idea = toIdeaResponse(storedIdeaSchema.parse(inserted));
    res.status(201).json({ idea });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ message: "Idea text must be between 1 and 280 characters." });
      return;
    }
    next(error);
  }
};

export const upvoteIdea: RequestHandler = async (req, res, next) => {
  try {
    const id = z.coerce.number().int().positive().parse(req.params.id);
    const updated = await incrementIdeaVotes(id);
    if (!updated) {
      res.status(404).json({ message: "Idea not found" });
      return;
    }
    const idea = toIdeaResponse(storedIdeaSchema.parse(updated));
    res.json({ idea });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Invalid idea id" });
      return;
    }
    next(error);
  }
};
