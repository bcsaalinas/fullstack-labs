import pool from "../config/db.js";
import { json } from "express";

export async function getAllUsers(req, res) {
  try {
    const result = await pool.query("SELECT * FROM users");
    console.log(result.rows[0]);

    res.json(result.rows);
  } catch (error) {
    console.error("Error: ", error);
  }
}

export async function getAllTasks(req, res) {
  try {
    const result = await pool.query("SELECT * FROM tasks");
    res.status(201).json({ message: result.rows });
  } catch (error) {
    console.error("Internal server error: ", error);
    res.status(500).json({ message: "Error at getAllTasks controller" });
  }
}
