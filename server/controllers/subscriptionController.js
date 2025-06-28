import db from '../config/db.js';

export const createSubscription = (req, res) => {
    const { name, phone, plan, meals, days, allergies, total_price } = req.body;

    const query = `
        INSERT INTO subscription (name, phone, plan, meals, delivery_days, allergies, total_price)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [name, phone, plan, JSON.stringify(meals), JSON.stringify(days), allergies, total_price],
        (err) => {
            if (err) {
                console.error('Insert Error:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(201).json({ message: 'Subscription saved successfully' });
        }
    );
};