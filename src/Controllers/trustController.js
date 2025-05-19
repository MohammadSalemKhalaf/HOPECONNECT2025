import pool from "../config/database.js";

export const addReview = async (req, res) => {
  try {
    const { orphanage_id, rating, comment } = req.body;
    const donor_id = req.user.id;

    const sql = `INSERT INTO orphanage_review (orphanage_id, donor_id, rating, comment) VALUES (?, ?, ?, ?)`;
    await pool.query(sql, [orphanage_id, donor_id, rating, comment]);

    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getReviewsForOrphanage = async (req, res) => {
  try {
    const { orphanageId } = req.params;

    const [reviews] = await pool.query(
      `SELECT r.*, u.full_name AS reviewer
       FROM orphanage_review r
       JOIN user u ON r.donor_id = u.id
       WHERE r.orphanage_id = ?`,
      [orphanageId]
    );

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyOrphanage = async (req, res) => {
  try {
    const orphanageId = req.params.id;
    await pool.query("UPDATE orphanage SET is_verified = TRUE WHERE id = ?", [orphanageId]);
    res.status(200).json({ message: "Orphanage verified successfully" });
  } catch (error) {
    console.error("Error verifying orphanage:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createImpactReport = async (req, res) => {
  try {
    const { report_title, details } = req.body;
    const donor_id = req.user.id;

    await pool.query(
      "INSERT INTO impact_report (donor_id, report_title, details) VALUES (?, ?, ?)",
      [donor_id, report_title, details]
    );

    res.status(201).json({ message: "Impact report created" });
  } catch (error) {
    console.error("Error creating impact report:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMyImpactReports = async (req, res) => {
  try {
    const donor_id = req.user.id;

    const [reports] = await pool.query(
      "SELECT * FROM impact_report WHERE donor_id = ?",
      [donor_id]
    );

    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
