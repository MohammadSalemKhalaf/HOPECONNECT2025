import pool from "../config/database.js";


export const createTask = async (req, res) => {
    const { orphanage_id, title, description, required_skill, task_date } = req.body;
    try {
      await pool.query(
        'INSERT INTO volunteer_task (orphanage_id, title, description, required_skill, task_date) VALUES (?, ?, ?, ?, ?)',
        [orphanage_id, title, description, required_skill, task_date]
      );
      res.status(201).json({ message: 'Task created successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error creating task', error: err });
    }
}

export const getOpenTasks = async (req, res) => {
    try {
      const [tasks] = await pool.query('SELECT * FROM volunteer_task WHERE status = "open"');
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching tasks', error: err });
    }
}

export const assignTask = async (req, res) => {
    const { task_id, volunteer_id } = req.body;
    try {
      await pool.query(
        'UPDATE volunteer_task SET status = "assigned", volunteer_id = ? WHERE id = ?',
        [volunteer_id, task_id]
      );
      res.status(200).json({ message: 'Task assigned successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error assigning task', error: err });
    }
}