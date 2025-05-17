import pool from "../config/database.js";

export const createDonationItem = async (req, res) => {
  try {
    const { donor_id, type, description, quantity, orphanage_id, delivery_date } = req.body;

    const sql = `
      INSERT INTO donation_item (donor_id, type, description, quantity, orphanage_id, delivery_date)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.query(sql, [donor_id, type, description, quantity, orphanage_id, delivery_date]);

    res.status(201).json({ message: "Donation item created successfully", donationId: result.insertId });
  } catch (error) {
    console.error("Error creating donation item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createDelivery = async (req, res) => {
  try {
    const { donation_item_id, driver_name, vehicle_info, location_coordinates, delivery_time } = req.body;

    const sql = `
      INSERT INTO delivery (donation_item_id, driver_name, vehicle_info, location_coordinates, delivery_time)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await pool.query(sql, [donation_item_id, driver_name, vehicle_info, location_coordinates, delivery_time]);

    res.status(201).json({ message: 'Delivery record created', deliveryId: result.insertId });
  } catch (error) {
    console.error("Error creating delivery:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateDeliveryStatus = async (req, res) => {
  try {
    const deliveryId = req.params.id;
    const { delivery_status } = req.body;

    const sql = `
      UPDATE delivery SET delivery_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `;

    await pool.query(sql, [delivery_status, deliveryId]);

    res.status(200).json({ message: 'Delivery status updated' });
  } catch (error) {
    console.error("Error updating delivery status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const trackDelivery = async (req, res) => {
  try {
    const deliveryId = req.params.id;

    const sql = `
      SELECT 
        delivery.*, 
        donation_item.type AS donation_type, 
        donation_item.description AS donation_description
      FROM delivery
      JOIN donation_item ON delivery.donation_item_id = donation_item.id
      WHERE delivery.id = ?
    `;

    const [results] = await pool.query(sql, [deliveryId]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Delivery not found' });
    }

    res.status(200).json(results[0]);
  } catch (error) {
    console.error("Error tracking delivery:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
