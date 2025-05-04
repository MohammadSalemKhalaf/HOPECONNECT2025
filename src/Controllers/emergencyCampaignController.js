import pool from "../config/database.js";
import { sendEmail } from "../utils/emailService.js";

export const createCampaign = async (req, res) => {
    const { title, description, goal_amount, start_date, end_date } = req.body;
    const sql = `INSERT INTO emergency_campaign (title, description, goal_amount, start_date, end_date)
                 VALUES (?, ?, ?, ?, ?)`;
    await pool.query(sql, [title, description, goal_amount, start_date, end_date]);
    res.status(201).json({ message: 'Campaign created successfully' });
  }

  export const donateToCampaign = async (req, res) => {
    const campaignId = req.params.id;
    const { user_id, amount } = req.body;
  
    try {
      // Insert donation
      await pool.query(
        `INSERT INTO emergency_donation (campaign_id, user_id, amount) VALUES (?, ?, ?)`,
        [campaignId, user_id, amount]
      );
  
      // Update collected amount
      await pool.query(
        `UPDATE emergency_campaign SET collected_amount = collected_amount + ? WHERE id = ?`,
        [amount, campaignId]
      );
  
      // Fetch user and campaign info
      const [[user]] = await pool.query(`SELECT full_name, email FROM user WHERE id = ?`, [user_id]);
      const [[campaign]] = await pool.query(`SELECT title FROM emergency_campaign WHERE id = ?`, [campaignId]);
  
      // Send email
      const subject = `📢 شكراً لمساهمتك في حملة: ${campaign.title}`;
      const text = `مرحباً ${user.full_name}،\n\nشكراً لتبرعك بمبلغ ${amount} دولار لحملة "${campaign.title}".\n\nنحن نقدّر دعمك.\n\nفريق HopeConnect.`;
  
      await sendEmail(user.email, subject, text);
  
      res.status(200).json({ message: "Donation received and email sent." });
    } catch (error) {
      console.error("Donation or email failed:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }



  export const getAllCampaigns = async (req, res) => {
    try {
      const [campaigns] = await pool.query("SELECT * FROM emergency_campaign");
      res.status(200).json(campaigns);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };