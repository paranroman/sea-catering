import db from '../config/db.js';

export const createSubscription = (req, res) => {
    const { phone, plan, meals, days, allergies, total_price } = req.body;
    const user_id = req.user?.id;

    if (!user_id) {
        return res.status(401).json({ error: "Unauthorized: user_id missing from token" });
    }

    const insertQuery = `
        INSERT INTO subscription (phone, plan, meals, delivery_days, allergies, total_price, user_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        insertQuery,
        [phone, plan, JSON.stringify(meals), JSON.stringify(days), allergies, total_price, user_id],
        (insertErr) => {
            if (insertErr) {
                console.error('Insert Error:', insertErr);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.status(201).json({ message: 'Subscription saved successfully' });
        }
    );
};


export const checkUserSubscription = async (req, res) => {
    const userId = req.user.id;

    try {
        const [subs] = await db.promise().query(
            "SELECT id FROM subscription WHERE user_id = ? LIMIT 1",
            [userId]
        );

        res.json({ subscribed: subs.length > 0 });
    } catch (err) {
        res.status(500).json({ error: "Error checking subscription status." });
    }
};