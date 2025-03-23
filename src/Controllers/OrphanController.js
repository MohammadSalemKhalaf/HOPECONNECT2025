import pool from "../config/database.js";


export const getOrphans = async (req, res) => {
  try {
    const [orphans] = await pool.query("SELECT * FROM orphan");
    res.status(200).json(orphans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export const getOrphanById = async (req, res) => {
  try {
    const [orphan] = await pool.query("SELECT * FROM orphan WHERE id = ?", [
      req.params.id,
    ]);
    if (orphan.length === 0) {
      return res.status(404).json({ message: "Orphan not found" });
    }
    res.status(200).json(orphan[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export const addOrphan = async (req, res) => {
  try {
    const [result] = await pool.query("INSERT INTO orphan SET ?", req.body);
    res.status(201).json({ message: "Orphan added successfully " });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const updateOrphan = async (req, res) => {
  try {
    const [result] = await pool.query("UPDATE orphan SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Orphan not found" });
    }
    res.status(200).json({ message: "Orphan updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export const deleteOrphan =async (req, res) => {
    try {
      const [result] = await pool.query("DELETE FROM orphan WHERE id = ?", [
        req.params.id,
      ]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Orphan not found" });
      }
      res.status(200).json({ message: "Orphan deleted successfully" });
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  
  }