import fs from "fs";
import path from "path";
import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";

const DEFAULT_DB_PATH = "data/ideas.sqlite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let database: sqlite3.Database | null = null;
let initializing: Promise<sqlite3.Database> | null = null;

async function initialize(): Promise<sqlite3.Database> {
  if (database) {
    return database;
  }
  if (initializing) {
    return initializing;
  }

  initializing = new Promise((resolve, reject) => {
    const dbPath = process.env.SQLITE_DB_PATH ?? DEFAULT_DB_PATH;
    const directory = path.dirname(dbPath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        reject(err);
        return;
      }

      db.run(
        `
        CREATE TABLE IF NOT EXISTS ideas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          text TEXT NOT NULL,
          votes INTEGER NOT NULL DEFAULT 0,
          created_at TEXT NOT NULL
        );
      `,
        (err) => {
          if (err) {
            reject(err);
            return;
          }
          // Insert seed data if table is empty
          db.get("SELECT COUNT(*) as count FROM ideas", (err, row: any) => {
            if (err) {
              reject(err);
              return;
            }
              if (row.count === 0) {
                const seedIdeas = [
                  {
                    text: "A smart mirror with built-in sensors and AI that provides real-time health insights. When a user stands in front of it, it performs facial analysis, posture detection, and skin condition monitoring. Integrated with smart scales and wearables, it gives daily health reports, suggests workouts, and even detects early signs of illness through visual and behavioral data (e.g., dehydration, fatigue).",
                    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
                    votes: 5,
                  },
                  {
                    text: "An AR app for smart glasses that translates foreign languages in real-time and overlays the translated text directly onto the world. Whether you’re reading a street sign in Tokyo or having a conversation in Paris, it displays subtitles or translated signage naturally. It also learns context and tone over time, making the translations smarter and more nuanced. Ideal for travelers, international workers, or global students.",
                    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
                    votes: 3,
                  },
                ];
                let inserted = 0;
                seedIdeas.forEach((idea) => {
                  db.run(
                    "INSERT INTO ideas (text, votes, created_at) VALUES (?, ?, ?)",
                    [idea.text, idea.votes, idea.created_at],
                    function (err) {
                      if (err) {
                        reject(err);
                        return;
                      }
                      inserted++;
                      if (inserted === seedIdeas.length) {
                        // Wait a moment before resolving to ensure all inserts complete
                        setTimeout(() => {
                          database = db;
                          resolve(db);
                        }, 100);
                      }
                    },
                  );
                });
              } else {
                database = db;
                resolve(db);
              }
          });
        },
      );
    });
  });

  try {
    return await initializing;
  } finally {
    initializing = null;
  }
}

function persist(db: sqlite3.Database) {
  // No-op for sqlite3, as changes are persisted automatically
}

export async function ensureDatabaseReady() {
  await initialize();
}

export async function listAllIdeas() {
  const db = await initialize();
  return new Promise<any[]>((resolve, reject) => {
    db.all(
      "SELECT id, text, votes, created_at FROM ideas ORDER BY datetime(created_at) DESC",
      (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      },
    );
  });
}

export async function insertIdea(text: string) {
  const db = await initialize();
  const sanitized = text.trim();
  const created_at = new Date().toISOString();
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO ideas (text, votes, created_at) VALUES (?, 0, ?)",
      [sanitized, created_at],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve({
          id: this.lastID,
          text: sanitized,
          votes: 0,
          created_at,
        });
      },
    );
  });
}

export async function incrementIdeaVotes(id: number) {
  const db = await initialize();
  return new Promise((resolve, reject) => {
    db.run("UPDATE ideas SET votes = votes + 1 WHERE id = ?", [id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      if (this.changes === 0) {
        resolve(null);
        return;
      }
      findIdeaById(id)
        .then((idea) => {
          resolve(idea);
        })
        .catch(reject);
    });
  });
}

export async function findIdeaById(id: number) {
  const db = await initialize();
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT id, text, votes, created_at FROM ideas WHERE id = ?",
      [id],
      (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        if (!row) {
          resolve(null);
          return;
        }
        resolve(row);
      },
    );
  });
}

export async function closeDatabase() {
  if (database) {
    database.close();
    database = null;
  }
}
