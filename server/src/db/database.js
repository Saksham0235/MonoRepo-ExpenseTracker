const Database=require("better-sqlite3")
const path=require("path")

const db=new Database(path.join(__dirname,"../../db.sqlite"))

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

module.exports=db;