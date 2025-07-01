import db from '../config/db.js';

export const getAdminMetrics = async (req, res) => {
    const { start, end } = req.query;

    try {
        // 1. New Subscriptions
        const [newSubs] = await db.promise().query(
            `SELECT COUNT(*) as count FROM subscription
             WHERE DATE(created_at) BETWEEN ? AND ?`, [start, end]);

        // 2. MRR
        const [mrr] = await db.promise().query(
            `SELECT SUM(total_price) as total FROM subscription
             WHERE status = 'active' AND DATE(created_at) BETWEEN ? AND ?`, [start, end]);

        // 3. Reactivations
        const [reactivations] = await db.promise().query(
            `SELECT COUNT(*) as count FROM subscription
             WHERE status = 'active' AND resumed_at IS NOT NULL AND DATE(resumed_at) BETWEEN ? AND ?`, [start, end]);

        // 4. Active Subscriptions
        const [activeSubs] = await db.promise().query(
            `SELECT COUNT(*) as count FROM subscription WHERE status = 'active'`);

        res.json({
            newSubscriptions: newSubs[0].count,
            mrr: mrr[0].total || 0,
            reactivations: reactivations[0].count,
            activeSubscriptions: activeSubs[0].count
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Gagal mengambil data metrik admin' });
    }
};