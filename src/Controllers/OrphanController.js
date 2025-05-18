import pool from "../config/database.js";


export const getOrphans = async (req, res) => {
  try {
    const [orphans] = await pool.query("select * from orphan");
    res.status(200).json(orphans);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}


export const getOrphanById = async (req, res) => {
  try {
    const [orphan] = await pool.query("select * from orphan where id = ?", [req.params.id,]);

    if (orphan.length === 0) {
      return res.status(404).json({ message: "Orphan not found or does not exist" });
    }
    res.status(200).json(orphan[0]);

  }
   catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export const addOrphan = async (req, res) => {
  try {
    const [result] = await pool.query("insert into orphan set ?", req.body);
    res.status(201).json({ message: "Orphan added successfully " });

  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const updateOrphan = async (req, res) => {
  try {
    const [result] = await pool.query("update orphan set ? where id = ?", [  req.body, req.params.id,]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Orphan not found" });
    }
    res.status(200).json({ message: "Orphan updated successfully" });
  }
   catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export const deleteOrphan =async (req, res) => {
    try {
      const [result] = await pool.query("delete from orphan where id = ?", [ req.params.id,
      ]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "orphan not found" });
      }
      res.status(200).json({ message: "Orphan deleted successfully" });
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ message: "Intenal Server Error" });
    }
  
  }