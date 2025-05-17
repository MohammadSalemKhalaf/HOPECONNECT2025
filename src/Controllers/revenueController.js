import pool from "../config/database.js";

export const recordRevenue = async (req, res) => {
  try {
    const { donation_id, amount, fee_percentage = 5.00 } = req.body;
    const fee_amount = (amount * fee_percentage) / 100;

    const sql = `
      INSERT INTO revenue_transaction (donation_id, amount, fee_percentage, fee_amount)
      VALUES (?, ?, ?, ?)
    `;

    await pool.query(sql, [donation_id, amount, fee_percentage, fee_amount]);

    res.status(201).json({ message: "Revenue recorded", fee_amount });
  } catch (error) {
    console.error("Error recording revenue:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllPartners = async (req, res) => {
  try {
    const [partners] = await pool.query("SELECT * FROM partner");
    res.status(200).json(partners);
  } catch (error) {
    console.error("Error fetching partners:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addPartner = async (req, res) => {
  try {
    const { name, type, contact_email, website, description } = req.body;

    const sql = `
      INSERT INTO partner (name, type, contact_email, website, description)
      VALUES (?, ?, ?, ?, ?)
    `;

    await pool.query(sql, [name, type, contact_email, website, description]);

    res.status(201).json({ message: "Partner added successfully" });
  } catch (error) {
    console.error("Error adding partner:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getRevenueSummary = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        COUNT(*) AS total_transactions,
        SUM(fee_amount) AS total_fees_collected
      FROM revenue_transaction
    `);

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching revenue summary:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deletePartner = async (req, res) => {
  try {
    const partnerId = req.params.id;

    const [result] = await pool.query(
      "DELETE FROM partner WHERE id = ?",
      [partnerId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Partner not found" });
    }

    res.status(200).json({ message: "Partner deleted successfully" });
  } catch (error) {
    console.error("Error deleting partner:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
