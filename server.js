const express = require("express");
const path = require("path");
const pool = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;


// ============================================================
// MIDDLEWARE
// ============================================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serve HTML, CSS, JavaScript, and images
app.use(express.static(path.join(__dirname)));


// ============================================================
// API STATUS
// ============================================================

app.get("/api/status", (req, res) => {

    res.json({
        success: true,
        message: "Elite IT Consulting API is running.",
        application: "Elite IT Consulting & Technology Services LLC"
    });

});


// ============================================================
// CREATE SUPPORT TICKET
// POST /api/support-tickets
// ============================================================

app.post("/api/support-tickets", async (req, res) => {

    try {

        const {
            companyName,
            issueType,
            details
        } = req.body;


        // --------------------------------------------
        // Validate required information
        // --------------------------------------------

        if (!companyName || !issueType || !details) {

            return res.status(400).json({
                success: false,
                message: "Company name, issue type, and details are required."
            });

        }


        // --------------------------------------------
        // Generate ticket number
        // --------------------------------------------

        const ticketNumber =
            "ELITE-" +
            Date.now().toString().slice(-6);


        // --------------------------------------------
        // Insert ticket into MySQL
        // --------------------------------------------

        const sql = `
            INSERT INTO support_tickets
            (
                ticket_number,
                company_name,
                issue_type,
                details
            )
            VALUES (?, ?, ?, ?)
        `;


        const [result] = await pool.execute(
            sql,
            [
                ticketNumber,
                companyName.trim(),
                issueType,
                details.trim()
            ]
        );


        // --------------------------------------------
        // Send successful response
        // --------------------------------------------

        res.status(201).json({

            success: true,

            message: "Support ticket created successfully.",

            ticket: {
                id: result.insertId,
                ticketNumber: ticketNumber,
                companyName: companyName.trim(),
                issueType: issueType,
                status: "Received"
            }

        });


    } catch (error) {

        console.error(
            "Error creating support ticket:",
            error.message
        );


        res.status(500).json({

            success: false,

            message:
                "Unable to create the support ticket at this time."

        });

    }

});


// ============================================================
// START SERVER
// ============================================================

app.listen(PORT, () => {

    console.log("==========================================");
    console.log("ELITE IT CONSULTING WEB SERVER");
    console.log("==========================================");

    console.log(
        `Server running at: http://localhost:${PORT}`
    );

    console.log(
        `API status: http://localhost:${PORT}/api/status`
    );

    console.log(
        `Support Ticket API: http://localhost:${PORT}/api/support-tickets`
    );

    console.log("==========================================");

});