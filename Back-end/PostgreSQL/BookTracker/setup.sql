-- BookTracker database setup
-- Run this once: psql -U postgres -f setup.sql

CREATE DATABASE "BookTracker";
\c "BookTracker"

-- Users table (populated by Google OAuth)
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  google_id     VARCHAR(255) UNIQUE NOT NULL,
  display_name  VARCHAR(255),
  email         VARCHAR(255),
  photo         TEXT,
  created_at    TIMESTAMP DEFAULT NOW()
);

-- Books table with user ownership
CREATE TABLE IF NOT EXISTS book (
  id             SERIAL PRIMARY KEY,
  user_id        INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title          VARCHAR(255) NOT NULL,
  author         VARCHAR(255) NOT NULL,
  genre          VARCHAR(100),
  rating         INTEGER DEFAULT 0,
  date_finished  DATE,
  notes          TEXT,
  bookcoverid    VARCHAR(255),
  created_at     TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_book_user_id ON book(user_id);

-- Session table for connect-pg-simple
CREATE TABLE IF NOT EXISTS "session" (
  "sid"    VARCHAR NOT NULL COLLATE "default",
  "sess"   JSON NOT NULL,
  "expire" TIMESTAMP(6) NOT NULL,
  PRIMARY KEY ("sid")
);

CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");

-- If migrating from an existing book table without user_id:
-- ALTER TABLE book ADD COLUMN user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;
-- UPDATE book SET user_id = 1;  -- assign existing books to first user
-- ALTER TABLE book ALTER COLUMN user_id SET NOT NULL;
