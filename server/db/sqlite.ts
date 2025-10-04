import fs from "fs";
import path from "path";
import initSqlJs from "sql.js";
import { fileURLToPath } from "url";

const DEFAULT_DB_PATH = "data/ideas.sqlite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let database: initSqlJs.Database | null = null;
let SQL: initSqlJs.SqlJsStatic | null = null;

async function initialize(): Promise<initSqlJs.Database> {
  if (database) {
    return database;
  }

  if (!SQL) {
    SQL = await initSqlJs();
  }

  const dbPath = process.env.SQLITE_DB_PATH ?? DEFAULT_DB_PATH;
  const directory = path.dirname(dbPath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  let db: initSqlJs.Database;
  if (fs.existsSync(dbPath)) {
    const filebuffer = fs.readFileSync(dbPath);
    db = new SQL.Database(filebuffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS ideas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      votes INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );
  `);

  // Insert seed data if table is empty
  const count = db.exec("SELECT COUNT(*) as count FROM ideas");
  if (count[0].values[0][0] === 0) {
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
    const insert = db.prepare("INSERT INTO ideas (text, votes, created_at) VALUES (?, ?, ?)");
    for (const idea of seedIdeas) {
      insert.run(idea.text, idea.votes, idea.created_at);
    }
    insert.free();
  }

  database = db;
  return db;
}

function persist(db: initSqlJs.Database) {
  const dbPath = process.env.SQLITE_DB_PATH ?? DEFAULT_DB_PATH;
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
}

export async function ensureDatabaseReady() {
  await initialize();
}

export async function listAllIdeas() {
  const db = await initialize();
  const result = db.exec("SELECT id, text, votes, created_at FROM ideas ORDER BY datetime(created_at) DESC");
  if (result.length === 0) return [];
  const columns = result[0].columns;
  const values = result[0].values;
  return values.map((row: any[]) => {
    const obj: any = {};
    columns.forEach((col, i) => obj[col] = row[i]);
    return obj;
  });
}

export async function insertIdea(text: string) {
  const db = await initialize();
  const sanitized = text.trim();
  if (!sanitized) {
    throw new Error("Idea text cannot be empty");
  }
  const created_at = new Date().toISOString();
  const stmt = db.prepare("INSERT INTO ideas (text, votes, created_at) VALUES (?, ?, ?)");
  const result = stmt.run(sanitized, 0, created_at);
  stmt.free();
  persist(db);
  return {
    id: result.insertId as number,
    text: sanitized,
    votes: 0,
    created_at,
  };
}

export async function incrementIdeaVotes(id: number) {
  const db = await initialize();
  const stmt = db.prepare("UPDATE ideas SET votes = votes + 1 WHERE id = ?");
  const result = stmt.run(id);
  stmt.free();
  if (result.changes === 0) {
    return null;
  }
  persist(db);
  return findIdeaById(id);
}

export async function findIdeaById(id: number) {
  const db = await initialize();
  const result = db.exec("SELECT id, text, votes, created_at FROM ideas WHERE id = ?", [id]);
  if (result.length === 0 || result[0].values.length === 0) return null;
  const columns = result[0].columns;
  const values = result[0].values[0];
  const obj: any = {};
  columns.forEach((col, i) => obj[col] = values[i]);
  return obj;
}

export function closeDatabase() {
  if (database) {
    persist(database);
    database = null;
  }
}
