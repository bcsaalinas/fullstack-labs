import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pool from "./db.js";

const PgStore = connectPgSimple(session);

const sessionMiddleware = session({
  store: new PgStore({
    pool: pool,
    tableName: "session",
    createTableIfMissing: false,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
    secure: false,
  },
});

export default sessionMiddleware;
