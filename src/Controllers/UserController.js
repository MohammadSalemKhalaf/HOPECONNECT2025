import pool from "../config/database.js";

export const getUsers= async (req, res) => {
  try {
    const [allUsers] = await pool.query("select * from user");
    res.status(200).json(allUsers);
  }
   catch (error) {

    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
}


export const getUserById = async (req, res) => {
  try {
    const [user] = await pool.query("select * from user where id = ?", [req.params.id,]);
    if (user.length === 0) {
      return res.status(404).json({ message: "not found" });
    }
    res.status(200).json(user[0]);
  }
   catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
}

export const createUser = async (req, res) => {
  try {
    const [result] = await pool.query("insert into user set ?", req.body);
    res.status(201).json({ message: "added successfully" });
  }
   catch (error) {

    console.error(error.message);
    res.status(500).json({ message: "Server Error" });

  }
}


export const updateUser = async (req, res) => {
  try {
    const [result] = await pool.query(`update user set ? where id = ?`, [ req.body, req.params.id, ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "updated successfully" });
  }
  
  catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export const deleteUser = async (req, res) => {
    try {
      const [result] = await pool.query("delete from user where id = ?", [ req.params.id,]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  
  
  }