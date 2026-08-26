import pool from "../config/db.js";

export async function getDashboard(req, res) {}

export async function createTask(req, res) {
  try {
    const { title, content } = req.body;

    //TODO : Implement function that gets userID from user
    const userId = 2;

    const result = await pool.query(
      "INSERT INTO tasks  (title, content, user_id) VALUES($1,$2,$3)",
      [title, content, userId],
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Internal server error", error);
    res.status(500);
  }
}
