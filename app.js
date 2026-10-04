// ============================================================
// ELITE IT CONSULTING & TECHNOLOGY SERVICES LLC
// Main JavaScript File
// ============================================================


// ============================================================
// SERVICE REQUEST BUTTONS
// ============================================================

function selectService(serviceName) {

    const messageBox = document.getElementById("serviceMessage");

    if (!messageBox) {
        return;
    }

    messageBox.textContent =
        "You selected: " +
        serviceName +
        ". Please use the support form below to provide your information.";

    messageBox.style.display = "block";

    messageBox.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


// ============================================================
// SUPPORT TICKET FORM
// ============================================================

const ticketForm = document.getElementById("ticketForm");

if (ticketForm) {

    ticketForm.addEventListener("submit", async function(event) {

        event.preventDefault();


        // --------------------------------------------------------
        // Get form values
        // --------------------------------------------------------

        const companyName =
            document.getElementById("companyName").value.trim();

        const issueType =
            document.getElementById("issueSelect").value;

        const details =
            document.getElementById("details").value.trim();

        const confirmationBox =
            document.getElementById("confirmationBox");


        // --------------------------------------------------------
        // Basic validation
        // --------------------------------------------------------

        if (!companyName || !issueType || !details) {

            confirmationBox.textContent =
                "Please complete all required fields before submitting your support ticket.";

            confirmationBox.style.display = "block";

            confirmationBox.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            return;
        }


        // --------------------------------------------------------
        // Show processing message
        // --------------------------------------------------------

        confirmationBox.innerHTML =
            "Submitting your support ticket...";

        confirmationBox.style.display = "block";


        try {

            // ----------------------------------------------------
            // Send ticket to Express API
            // ----------------------------------------------------

            const response = await fetch(
                "/api/support-tickets",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        companyName: companyName,
                        issueType: issueType,
                        details: details
                    })
                }
            );


            // ----------------------------------------------------
            // Convert server response to JSON
            // ----------------------------------------------------

            const data = await response.json();


            // ----------------------------------------------------
            // Handle API error
            // ----------------------------------------------------

            if (!response.ok || !data.success) {

                throw new Error(
                    data.message ||
                    "Unable to submit the support ticket."
                );
            }


            // ----------------------------------------------------
            // Display successful ticket
            // ----------------------------------------------------

            confirmationBox.innerHTML =
                "<strong>Support Ticket Submitted Successfully</strong><br>" +
                "Ticket Number: " +
                data.ticket.ticketNumber +
                "<br>" +
                "Company: " +
                data.ticket.companyName +
                "<br>" +
                "Issue Type: " +
                data.ticket.issueType +
                "<br>" +
                "Status: " +
                data.ticket.status;


            confirmationBox.style.display = "block";


            // ----------------------------------------------------
            // Clear form after successful submission
            // ----------------------------------------------------

            ticketForm.reset();


            // ----------------------------------------------------
            // Scroll to confirmation
            // ----------------------------------------------------

            confirmationBox.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });


        } catch (error) {

            // ----------------------------------------------------
            // Handle connection/server error
            // ----------------------------------------------------

            console.error(
                "Support ticket submission error:",
                error
            );


            confirmationBox.innerHTML =
                "<strong>Unable to Submit Support Ticket</strong><br>" +
                "There was a problem connecting to the server. " +
                "Please try again.";

            confirmationBox.style.display = "block";


            confirmationBox.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }

    });

}


// ============================================================
// CUSTOMER FEEDBACK FORM
// ============================================================

const feedbackForm =
    document.getElementById("feedbackForm");

if (feedbackForm) {

    feedbackForm.addEventListener("submit", function(event) {

        event.preventDefault();


        // ========================================================
        // STRING DATA TYPES
        // Customer name and written feedback are stored as strings
        // ========================================================

        const customerName =
            document.getElementById("customerName").value.trim();

        const feedback =
            document.getElementById("feedback").value.trim();


        // ========================================================
        // NUMBER DATA TYPE
        // HTML form values are strings by default.
        // Number() converts the selected rating into a number.
        // ========================================================

        const rating =
            Number(document.getElementById("rating").value);


        // ========================================================
        // BOOLEAN DATA TYPE
        // This becomes true for ratings of 4 or 5,
        // and false for ratings of 1, 2, or 3.
        // ========================================================

        const isPositiveReview =
            rating >= 4;


        // ========================================================
        // NULL DATA TYPE
        // No follow-up message has been assigned yet.
        // ========================================================

        let followUpMessage = null;


        // Get the area where the confirmation will appear

        const feedbackMessage =
            document.getElementById("feedbackMessage");


        // ========================================================
        // FORM VALIDATION
        // ========================================================

        if (
            !customerName ||
            rating < 1 ||
            rating > 5 ||
            !feedback
        ) {

            feedbackMessage.textContent =
                "Please complete all required fields before submitting your feedback.";

            feedbackMessage.style.display = "block";

            feedbackMessage.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            return;
        }


        // ========================================================
        // DETERMINE THE FOLLOW-UP MESSAGE
        // ========================================================

        if (isPositiveReview) {

            followUpMessage =
                "We appreciate your positive feedback.";

        } else {

            followUpMessage =
                "Thank you for your feedback. We will use it to improve our services.";

        }


        // ========================================================
        // DISPLAY CONFIRMATION
        // ========================================================

        feedbackMessage.innerHTML =
            "<strong>Thank you, " +
            customerName +
            "!</strong><br>" +
            "Your " +
            rating +
            "-star feedback has been submitted successfully.<br>" +
            followUpMessage;


        feedbackMessage.style.display = "block";


        // ========================================================
        // CLEAR THE FORM
        // ========================================================

        feedbackForm.reset();


        // ========================================================
        // SCROLL TO THE CONFIRMATION MESSAGE
        // ========================================================

        feedbackMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

}

// ============================================================
// NETWORKING TECHNOLOGY MOUSE INTERACTION
// ============================================================

const equipmentCards =
    document.querySelectorAll(".equipment-card");

equipmentCards.forEach(function(card) {

    // Mouse enters the technology card
    card.addEventListener("mouseenter", function() {

        card.style.transform = "translateY(-8px)";
        card.style.boxShadow =
            "0 12px 28px rgba(0, 0, 0, 0.18)";

        card.style.transition =
            "transform 0.3s ease, box-shadow 0.3s ease";

    });


    // Mouse leaves the technology card
    card.addEventListener("mouseleave", function() {

        card.style.transform = "translateY(0)";
        card.style.boxShadow = "";

    });

});