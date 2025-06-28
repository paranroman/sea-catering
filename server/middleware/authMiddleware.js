import jwt from "jsonwebtoken";

const JWT_SECRET = "rahasia_super_aman";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("Token tidak ada");
        return res.status(401).json({ error: "Token tidak ditemukan. Akses ditolak." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        console.log("Token valid:", decoded);
        next();
    } catch (err) {
        console.log("Token invalid");
        return res.status(401).json({ error: "Token tidak valid." });
    }
};