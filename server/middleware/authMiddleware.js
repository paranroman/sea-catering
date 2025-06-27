import jwt from "jsonwebtoken";
const JWT_SECRET = "rahasia_super_aman";

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ error: "Token tidak ditemukan." });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ error: "Token tidak valid." });
    }
};
