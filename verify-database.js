const pool = require("./db");

async function verifyDatabase() {

    try {

        const [tables] = await pool.query("SHOW TABLES");

        console.log("");
        console.log("====================================");
        console.log("DATABASE TABLES");
        console.log("====================================");

        if (tables.length === 0) {

            console.log("No tables were found.");

        } else {

            tables.forEach((table) => {
                console.log(Object.values(table)[0]);
            });

        }

        console.log("====================================");

    } catch (error) {

        console.error("Database verification failed:");
        console.error(error.message);

    } finally {

        await pool.end();

    }
}

verifyDatabase();