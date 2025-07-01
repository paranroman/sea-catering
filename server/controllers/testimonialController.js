import db from "../config/db.js";

export const getTestimonials = (req, res) => {
    const query = `
        SELECT t.id, u.fullName AS name, t.message, t.rating, t.created_at
        FROM testimonial t
        JOIN users u ON t.user_id = u.id
        ORDER BY t.created_at DESC
    `;

    db.query(query, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
};


export const createTestimonial = async (req, res) => {
    const { message, rating } = req.body;

    if (!message || !rating) {
        return res.status(400).json({ error: "Message dan rating wajib diisi" });
    }

    try {
        const [userRows] = await db
            .promise()
            .query("SELECT id, fullName FROM users WHERE email = ?", [req.user.email]);

        const userId = userRows[0]?.id;
        const fullName = userRows[0]?.fullName;

        if (!userId) {
            return res.status(404).json({ error: "User tidak ditemukan." });
        }

        await db
            .promise()
            .query(
                "INSERT INTO testimonial (user_id, message, rating) VALUES (?, ?, ?)",
                [userId, message, rating]
            );

        res.status(201).json({
            name: fullName,
            message,
            rating: parseFloat(rating)
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error saat menyimpan testimonial" });
    }
};