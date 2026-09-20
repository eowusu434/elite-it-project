const pool = require("./db");

async function testDatabaseConnection() {

    try {

        const connection = await pool.getConnection();

        console.log("====================================");
        console.log("MySQL CONNECTION SUCCESSFUL");
        console.log("====================================");

        console.log(
            "Connected to database: " +
            process.env.DB_NAME
        );

        connection.release();

        await pool.end();

    } catch (error) {

        console.error("====================================");
        console.error("MYSQL CONNECTION FAILED");
        console.error("====================================");

        console.error(error.message);

        process.exit(1);
    }
}

testDatabaseConnection();