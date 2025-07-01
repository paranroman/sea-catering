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
            "SELECT id FROM subscription WHERE user_id = ? AND status = 'active' LIMIT 1",
            [userId]
        );

        res.json({ subscribed: subs.length > 0 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error checking subscription status." });
    }
};

export const getUserSubscription = async (req, res) => {
    try {
        const [user] = await db.promise().query("SELECT id FROM users WHERE email = ?", [req.user.email]);
        const userId = user[0]?.id;

        const [subscriptions] = await db.promise().query(
            "SELECT * FROM subscription WHERE user_id = ?",
            [userId]
        );

        res.status(200).json(subscriptions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Gagal mengambil subscription user" });
    }
};

export const pauseSubscription = async (req, res) => {
    const userId = req.user.id;
    const { pauseEnd } = req.body;

    if (!pauseEnd) {
        return res.status(400).json({ error: "Tanggal akhir pause harus diisi." });
    }

    try {
        await db.promise().query(
            `UPDATE subscription
             SET status = 'paused', pause_start = NOW(), pause_end = ?
             WHERE user_id = ? AND status = 'active'`,
            [pauseEnd, userId]
        );

        res.json({ message: 'Subscription paused successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Gagal melakukan pause subscription.' });
    }
};

export const resumeSubscription = async (req, res) => {
    const userId = req.user.id;

    try {
        await db.promise().query(
            `UPDATE subscription 
             SET status = 'active', resumed_at = NOW(), pause_start = NULL
             WHERE user_id = ? AND status = 'paused'`,
            [userId]
        );

        res.json({ message: 'Subscription resumed successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Gagal resume subscription.' });
    }
};

export const cancelSubscription = async (req, res) => {
    const userId = req.user.id;

    try {
        await db.promise().query(
            `DELETE FROM subscription
             WHERE user_id = ? AND status IN ('active', 'paused')`,
            [userId]
        );

        res.json({ message: 'Subscription cancelled and deleted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Gagal cancel dan hapus subscription.' });
    }
};
