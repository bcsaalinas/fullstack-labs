import pool from "../config/db.js";

export async function getDashboard(req, res) {
  try {
    //1- Get the user ID from the request (e.g., from a JWT token or session)
    const userId = 2;

    //2- Query the database to get the tasks for that specific user
    const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [
      userId,
    ]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Internal server error", error);
    res.status(500).json({ error: "Internal server error" });
  }

  //pseudocode:
}

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

export async function deleteTask(req, res) {
  try {
    //TODO : Implement function that gets userID from user, pending
    const { id } = req.params;
    const result = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);

    res.status(200).json(result);
  } catch (error) {
    console.error("Internal server error", error);
    res.status(500);
  }
}

export async function updateTask(req, res) {
  try {
    const [id] = req.params;

    //TODO : implement function that gets userID from session, pending
    const { userId } = 2;
    const { title, content } = req.body;

    const date = new Date.now();

    const result = await pool.query(
      "UPDATE task SET title = $1, content = $2, updated_at = $3 WHERE id = $4 AND user_id = $5",
      [title, content, date, id, userId],
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("Internal server error", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
