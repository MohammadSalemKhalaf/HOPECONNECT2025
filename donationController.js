import pool from '../config/database.js';

export const createSponsorship = async (req, res) => {
    try {
        const { sponsor_id, orphan_id, payment_method_id, amount, start_date, end_date, status, frequency, next_payment_date, notes } = req.body;

        const [result] = await pool.query(
            'INSERT INTO sponsorship (sponsor_id, orphan_id, payment_method_id, amount, start_date, end_date, status, frequency, next_payment_date, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [sponsor_id, orphan_id, payment_method_id, amount, start_date, end_date, status, frequency, next_payment_date, notes]
        );

        const sponsorshipId = result.insertId;
        res.status(201).json({ id: sponsorshipId, ...req.body });
    } catch (error) {
        console.error('Error creating sponsorship:', error);
        res.status(500).json({ message: 'Failed to create sponsorship', error: error.message });
    }
};

export const getAllSponsorships = async (req, res) => {
    try {
        const { page = 1, pageSize = 10 } = req.query;
        const limit = parseInt(pageSize, 10);
        const offset = (page - 1) * limit;

        const query = `
            SELECT sponsorship.*, orphan.full_name AS orphanName, user.full_name AS sponsorName
            FROM sponsorship
            INNER JOIN orphan ON sponsorship.orphan_id = orphan.id
            INNER JOIN user ON sponsorship.sponsor_id = user.id
            LIMIT ? OFFSET ?
        `;

        const countQuery = 'SELECT COUNT(*) AS total FROM sponsorship';

        const [sponsorships] = await pool.query(query, [limit, offset]);
        const [total] = await pool.query(countQuery);

        const totalItems = total[0].total;
        const totalPages = Math.ceil(totalItems / limit);

        res.json({
            totalItems: totalItems,
            totalPages: totalPages,
            currentPage: parseInt(page, 10),
            pageSize: limit,
            sponsorships: sponsorships,
        });
    } catch (error) {
        console.error('Error fetching sponsorships:', error);
        res.status(500).json({ message: 'Failed to fetch sponsorships', error: error.message });
    }
};

export const getSponsorshipById = async (req, res) => {
    try {
        const { id } = req.params;

        const query = `
            SELECT sponsorship.*, orphan.full_name AS orphanName, user.full_name AS sponsorName
            FROM sponsorship
            INNER JOIN orphan ON sponsorship.orphan_id = orphan.id
            INNER JOIN user ON sponsorship.sponsor_id = user.id
            WHERE sponsorship.id = ?
        `;

        const [sponsorships] = await pool.query(query, [id]);

        if (sponsorships.length === 0) {
            return res.status(404).json({ message: 'Sponsorship not found' });
        }

        res.json(sponsorships[0]);
    } catch (error) {
        console.error('Error fetching sponsorship by ID:', error);
        res.status(500).json({ message: 'Failed to fetch sponsorship', error: error.message });
    }
};

export const updateSponsorship = async (req, res) => {
    try {
        const { id } = req.params;
        const { sponsor_id, orphan_id, payment_method_id, amount, start_date, end_date, status, frequency, next_payment_date, notes } = req.body;

        const query = `
            UPDATE sponsorship
            SET sponsor_id = ?, orphan_id = ?, payment_method_id = ?, amount = ?, start_date = ?, end_date = ?, status = ?, frequency = ?, next_payment_date = ?, notes = ?
            WHERE id = ?
        `;

        const [result] = await pool.query(query, [sponsor_id, orphan_id, payment_method_id, amount, start_date, end_date, status, frequency, next_payment_date, notes, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Sponsorship not found' });
        }

        const [updatedSponsorships] = await pool.query(
            `SELECT * FROM sponsorship WHERE id = ?`,
            [id]
        );

        res.json(updatedSponsorships[0]);
    } catch (error) {
        console.error('Error updating sponsorship:', error);
        res.status(500).json({ message: 'Failed to update sponsorship', error: error.message });
    }
};

export const deleteSponsorship = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM sponsorship WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Sponsorship not found' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting sponsorship:', error);
        res.status(500).json({ message: 'Failed to delete sponsorship', error: error.message });
    }
};