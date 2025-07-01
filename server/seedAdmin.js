import db from './config/db.js';
import bcrypt from 'bcryptjs';

const createAdminUser = async () => {
    const fullName = "Admin SEA Catering";
    const email = "admin@seacatering.id";
    const password = "#Admin123";
    const role = "admin";

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = `
        INSERT INTO users (fullName, email, password, role)
        VALUES (?, ?, ?, ?)
    `;

    db.query(insertQuery, [fullName, email, hashedPassword, role], (err) => {
        if (err) {
            console.error("Gagal membuat admin:", err);
        } else {
            console.log("✅ Admin berhasil dibuat!");
        }
        process.exit();
    });
};

createAdminUser();
