import "dotenv/config";
import cors from "cors";
import express from "express";

import { ensureDatabaseReady } from "./db/sqlite";
import { handleDemo } from "./routes/demo";
import { createIdea, listIdeas, upvoteIdea } from "./routes/ideas";

ensureDatabaseReady().catch((error) => {
  console.error("Failed to initialize idea database", error);
});

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  app.get("/api/ideas", listIdeas);
  app.post("/api/ideas", createIdea);
  app.post("/api/ideas/:id/upvote", upvoteIdea);

  app.use((error: unknown, _req, res, _next) => {
    console.error("Unhandled server error", error);
    res.status(500).json({ message: "Internal server error" });
  });

  return app;
}
