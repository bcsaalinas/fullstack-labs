import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
const pool = new pg.Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  database: process.env.DB_NAME || "todo_list_fullstack",
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

export default pool;
