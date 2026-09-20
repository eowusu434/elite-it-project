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


        const customerName =
            document.getElementById("customerName").value.trim();

        const rating =
            document.getElementById("rating").value;

        const feedback =
            document.getElementById("feedback").value.trim();

        const feedbackMessage =
            document.getElementById("feedbackMessage");


        // Basic validation

        if (!customerName || !rating || !feedback) {

            feedbackMessage.textContent =
                "Please complete all required fields before submitting your feedback.";

            feedbackMessage.style.display = "block";

            return;
        }


        // Display confirmation

        feedbackMessage.innerHTML =
            "<strong>Thank you, " +
            customerName +
            "!</strong><br>" +
            "Your " +
            rating +
            "-star feedback has been submitted successfully.";


        feedbackMessage.style.display = "block";


        // Clear form

        feedbackForm.reset();


        // Scroll to confirmation

        feedbackMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

}