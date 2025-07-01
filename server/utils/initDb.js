import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const initDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            multipleStatements: true,
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS sea_catering;`);
        await connection.query(`USE sea_catering;`);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fullName VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role ENUM('user', 'admin') DEFAULT 'user'
                );
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS subscription (
                id INT AUTO_INCREMENT PRIMARY KEY,
                phone VARCHAR(20) NOT NULL,
                plan VARCHAR(50) NOT NULL,
                meals JSON NOT NULL,
                delivery_days JSON NOT NULL,
                allergies TEXT,
                total_price INT,
                user_id INT,
                status ENUM('active','paused') DEFAULT 'active',
                pause_start DATE NULL,
                pause_end DATE NULL,
                resumed_at DATETIME NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS testimonial (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                message TEXT NOT NULL,
                rating FLOAT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log("Database dan semua tabel berhasil dibuat.");
        await connection.end();
    } catch (error) {
        console.error("Gagal setup database:", error);
    }
};

initDB();
