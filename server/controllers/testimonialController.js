import db from "../config/db.js";

export const getTestimonials = (req, res) => {
    db.query("SELECT * FROM testimonial ORDER BY created_at DESC", (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
};

export const createTestimonial = async (req, res) => {
    const { message, rating } = req.body;
    const [rows] = await db.promise().query("SELECT fullName FROM users WHERE email = ?", [req.user.email]);
    const name = rows[0]?.fullName || req.user.email.split('@')[0];


    if (!message || !rating) {
        return res.status(400).json({ error: "Message dan rating wajib diisi" });
    }

    db.query(
        "INSERT INTO testimonial (name, message, rating) VALUES (?, ?, ?)",
        [name, message, rating],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ id: result.insertId, name, message, rating });
        }
    );
};