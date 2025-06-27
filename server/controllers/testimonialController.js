import db from "../config/db.js";

export const getTestimonials = (req, res) => {
    db.query("SELECT * FROM testimonial ORDER BY created_at DESC", (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
};

export const createTestimonial = (req, res) => {
    const { name, message, rating } = req.body;
    if (!name || !message || !rating) {
        return res.status(400).json({ error: "Semua field wajib diisi" });
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
