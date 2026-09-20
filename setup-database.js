const fs = require("fs");
const mysql = require("mysql2/promise");
require("dotenv").config();

async function setupDatabase() {
    let connection;

    try {
        const sql = fs.readFileSync("database.sql", "utf8");

        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT) || 3306,
            multipleStatements: true
        });

        console.log("Connected to MySQL.");
        console.log("Running database schema...");

        await connection.query(sql);

        console.log("------------------------------------");
        console.log("DATABASE SETUP SUCCESSFUL");
        console.log("------------------------------------");
        console.log("All tables were created successfully.");

    } catch (error) {

        console.error("------------------------------------");
        console.error("DATABASE SETUP FAILED");
        console.error("------------------------------------");
        console.error(error.message);

    } finally {

        if (connection) {
            await connection.end();
        }
    }
}

setupDatabase();