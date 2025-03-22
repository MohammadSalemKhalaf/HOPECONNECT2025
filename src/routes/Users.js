import express from "express";
import pool from "../config/database.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [allUsers] = await pool.query("SELECT * FROM user");
    res.status(200).json(allUsers);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [user] = await pool.query("SELECT * FROM user WHERE id = ?", [
      req.params.id,
    ]);
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const [result] = await pool.query("INSERT INTO user SET ?", req.body);
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const [result] = await pool.query(`UPDATE user SET ? WHERE id = ?`, [
      req.body,
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM user WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }


})

export default router;
