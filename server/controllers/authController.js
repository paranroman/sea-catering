import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

const JWT_SECRET = "rahasia_super_aman";

export const register = async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ error: "Semua field wajib diisi." });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~])[A-Za-z\d!@#$%^&*()_\-+=<>?{}[\]~]{8,}$/;

    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            error:
                "Password minimal 8 karakter dan harus ada huruf besar, kecil, angka dan karakter spesial. Silahkan coba lagi.",
        });
    }

    try {
        const [existing] = await db
            .promise()
            .query("SELECT * FROM users WHERE email = ?", [email]);
        if (existing.length > 0) {
            return res.status(409).json({ error: "Email sudah terdaftar." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db
            .promise()
            .query(
                "INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)",
                [fullName, email, hashedPassword]
            );

        res.status(201).json({ message: "Registrasi berhasil!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Terjadi kesalahan server." });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [userRows] = await db
            .promise()
            .query("SELECT * FROM users WHERE email = ?", [email]);
        const user = userRows[0];


        if (!user) {
            return res.status(401).json({ error: "Email tidak ditemukan." });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: "Password salah." });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({
            message: "Login berhasil",
            token,
            user: {
                id: user.id,
                full_name: user.fullName,
                email: user.email
            }
        });

    } catch (e) {
        res.status(500).json({ error: "Terjadi kesalahan saat login." + e.message });
    }
};

export const getProfile = async (req, res) => {
    const userId = req.user.id;

    try {
        const [[user]] = await db.promise().query(
            "SELECT fullName, email FROM users WHERE id = ?", [userId]
        );

        const [[sub]] = await db.promise().query(
            "SELECT phone FROM subscription WHERE user_id = ? ORDER BY id DESC LIMIT 1", [userId]
        );

        res.json({ fullName: user.fullName, email: user.email, phone: sub?.phone || '' });
    } catch (err) {
        res.status(500).json({ error: "Server error fetching profile" });
    }
};

export const updateProfile = async (req, res) => {
    const { fullName, email, phone } = req.body;
    const userId = req.user.id;

    try {
        await db.promise().query(
            "UPDATE users SET fullName = ?, email = ? WHERE id = ?",
            [fullName, email, userId]
        );

        const [subs] = await db.promise().query(
            "SELECT id FROM subscription WHERE user_id = ? LIMIT 1",
            [userId]
        );

        if (subs.length > 0) {
            await db.promise().query(
                "UPDATE subscription SET phone = ? WHERE user_id = ?",
                [phone, userId]
            );
        }

        res.json({ message: "Profile updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error updating profile" });
    }
};