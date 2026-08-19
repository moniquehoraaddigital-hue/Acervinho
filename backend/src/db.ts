import sqlite3 from "sqlite3"
import { open } from "sqlite"

// Opens (and creates) a local SQLite DB at backend/data.db
export async function openDb() {
  const db = await open({
    filename: "backend/data.db",
    driver: sqlite3.Database,
  })

  // Create documents table if missing
  await db.exec(`
    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT,
      embedding TEXT, -- JSON stringified array
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  return db
}
