
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(
  path.join(__dirname, "../../db.sqlite")
);

db.pragma("foreign_keys = ON");

// Create users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Create expenses table
db.exec(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    note TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Migrate existing expenses table
const columns = db.prepare(
  "PRAGMA table_info(expenses)"
).all();

const hasUserId = columns.some(
  column => column.name === "user_id"
);

if (!hasUserId) {
  db.exec(`
    ALTER TABLE expenses
    ADD COLUMN user_id INTEGER REFERENCES users(id)
  `);
}

export default db;
