import pool from "../config/database.js";


export const createCampaign = async (req, res) => {
    const { title, description, goal_amount, start_date, end_date } = req.body;
    const sql = `insert into emergency_campaign (title, description, goal_amount, start_date, end_date)  values (?, ?, ?, ?, ?)`;
    await pool.query(sql, [title, description, goal_amount, start_date, end_date]);
    res.status(201).json({ message: 'Campaign created successfully' });
  }

  export const donateToCampaign = async (req, res) => {
    const campaignId = req.params.id;
    const { user_id, amount } = req.body;
  
    try {
      await pool.query(
        `insert into emergency_donation (campaign_id, user_id, amount) values (?, ?, ?)`,
        [campaignId, user_id, amount]
      );
  
      
      await pool.query(
        `UPDATE emergency_campaign set collected_amount = collected_amount + ? where id = ?`,
        [amount, campaignId]
      );
  
  
      res.status(200).json({ message: "Donation received" });
    } catch (error) {
      console.error("Donation  failed:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }



  export const getAllCampaigns = async (req, res) => {
    try {
      const [campaigns] = await pool.query("select * from emergency_campaign");
      res.status(200).json(campaigns);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };