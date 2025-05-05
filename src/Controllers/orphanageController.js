import pool from '../config/database.js';

export const getAllOrphanages = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM orphanage');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal server error' });
  }
};


export const getOrphanageById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM orphanage WHERE id = ?', [id]);

    if (!rows.length) return res.status(404).json({ error: 'not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal server error' });
  }
};

export const createOrphanage = async (req, res) => {
  const { name, location, contact_name, contact_phone, contact_email, description, established_date, registration_number } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO orphanage (name, location, contact_name, contact_phone, contact_email, description, established_date, registration_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, location, contact_name, contact_phone, contact_email, description, established_date, registration_number]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal server error' });
  }
};

export const updateOrphanage = async (req, res) => {
  const { id } = req.params;
  const fields = Object.keys(req.body).map(key => `${key} = ?`).join(', ');
  const values = [...Object.values(req.body), id];
  try {
    await pool.query(`UPDATE orphanage SET ${fields} WHERE id = ?`, values);
    res.json({ id, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal server error' });
  }
};

export const deleteOrphanage = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM orphanage WHERE id = ?', [id]);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal server error' });
  }
};