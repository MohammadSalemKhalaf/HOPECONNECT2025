import pool from "../config/database.js";


export const createTask = async (req, res) => {
    const { orphanage_id,volunteer_id, title, description, required_skill, task_date } = req.body;
    try {
      await pool.query(
        'insert into volunteer_task (orphanage_id,volunteer_id, title, description, required_skill, task_date) values (?,?, ?, ?, ?, ?)',
        [orphanage_id,volunteer_id, title, description, required_skill, task_date]
      );
      res.status(201).json({ message: 'Task created successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error creating task', error: err });
    }
}

export const getOpenTasks = async (req, res) => {
    try {
      const [tasks] = await pool.query('select * from volunteer_task where status = "open"');
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching tasks', error: err });
    }
}

export const assignTask = async (req, res) => {
    const { task_id, volunteer_id } = req.body;
    try {
      await pool.query(
        'update volunteer_task set status = "assigned", volunteer_id = ? where id = ?',
        [volunteer_id, task_id]
      );
      res.status(200).json({ message: 'Task assigned successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error assigning task', error: err });
    }
}