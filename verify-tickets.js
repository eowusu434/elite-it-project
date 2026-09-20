const pool = require("./db");

async function verifyTickets() {

    try {

        const [tickets] = await pool.query(`
            SELECT
                ticket_id,
                ticket_number,
                company_name,
                issue_type,
                details,
                status,
                created_at
            FROM support_tickets
            ORDER BY ticket_id DESC
        `);

        console.log("");
        console.log("==========================================");
        console.log("SUPPORT TICKETS IN MYSQL");
        console.log("==========================================");

        if (tickets.length === 0) {

            console.log("No support tickets found.");

        } else {

            tickets.forEach((ticket) => {

                console.log("------------------------------------------");
                console.log("Ticket ID:", ticket.ticket_id);
                console.log("Ticket Number:", ticket.ticket_number);
                console.log("Company:", ticket.company_name);
                console.log("Issue:", ticket.issue_type);
                console.log("Details:", ticket.details);
                console.log("Status:", ticket.status);
                console.log("Created:", ticket.created_at);

            });

        }

        console.log("==========================================");

    } catch (error) {

        console.error("");
        console.error("Ticket verification failed:");
        console.error(error.message);

    } finally {

        await pool.end();

    }
}

verifyTickets();