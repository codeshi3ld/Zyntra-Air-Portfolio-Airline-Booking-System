document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // PHRASE TEXT ROTATION
    // =====================================================
    const phrases = [
        "Explore the World",
        "Explore the Earth",
        "Discover the Universe",
        "Explore the Oceans"
    ];

    let currentIndex = 0;
    const textElement = document.getElementById("text");

    // Check if text element exists
    if (textElement) {

        // Function for changing text automatically
        function changeText() {

            // Add fade out animation
            textElement.classList.add("fade-out");

            setTimeout(() => {

                // Change text content
                textElement.innerText = phrases[currentIndex];

                // Remove fade out and add fade in
                textElement.classList.remove("fade-out");
                textElement.classList.add("fade-in");

                // Move to next phrase
                currentIndex =
                    (currentIndex + 1) % phrases.length;

            }, 500);
        }

        // Change text every 2 seconds
        setInterval(changeText, 2000);
    }


    // =====================================================
    // HAMBURGER MENU
    // =====================================================
    window.toggleMenu = function () {

        const navLinks =
            document.querySelector(".nav-links");

        const hamburger =
            document.getElementById("hamburger");

        // Toggle navigation links
        if (navLinks) {
            navLinks.classList.toggle("active");
        }

        // Animate hamburger icon
        if (hamburger) {
            hamburger.classList.toggle("open");
        }
    };


    // =====================================================
    // MEGA DROPDOWN MENU
    // =====================================================
    const megaBtn =
        document.querySelector(".mega-btn");

    const megaMenu =
        document.querySelector(".mega-menu");

    // Check if mega menu exists
    if (megaBtn && megaMenu) {

        // Open and close mega menu
        megaBtn.addEventListener("click", function (event) {

            event.preventDefault();

            megaMenu.style.display =
                megaMenu.style.display === "grid"
                    ? "none"
                    : "grid";
        });

        // Close menu when clicking outside
        document.addEventListener("click", function (event) {

            if (
                !megaMenu.contains(event.target) &&
                !megaBtn.contains(event.target)
            ) {
                megaMenu.style.display = "none";
            }
        });

        // Global function for closing mega menu
        window.closeMega = function () {
            megaMenu.style.display = "none";
        };
    }


    // =====================================================
    // TRIP TYPE SELECTION
    // =====================================================
    const oneWay =
        document.getElementById("oneWay");

    const returnTrip =
        document.getElementById("returnTrip");

    const multiCity =
        document.getElementById("multiCity");

    const returnDate =
        document.getElementById("returnDate");

    const multiCitySection =
        document.getElementById("multiCitySection");

    const multiErrorBox =
        document.getElementById("multiError");

    // Check if trip type radio buttons exist
    if (
        oneWay &&
        returnTrip &&
        multiCity
    ) {

        // One-way trip selected
        oneWay.addEventListener("change", function () {

            if (returnDate) {
                returnDate.style.display = "none";
            }

            if (multiCitySection) {
                multiCitySection.style.display = "none";
            }

            // Clear multi-city errors
            if (multiErrorBox) {
                multiErrorBox.style.display = "none";
                multiErrorBox.textContent = "";
            }

            // Remove red borders
            ["from2", "to2", "date2"].forEach(id => {

                const input =
                    document.getElementById(id);

                if (input) {
                    input.classList.remove("input-error");
                }
            });
        });

        // Return trip selected
        returnTrip.addEventListener("change", function () {

            if (returnDate) {
                returnDate.style.display = "inline-block";
            }

            if (multiCitySection) {
                multiCitySection.style.display = "none";
            }

            // Clear multi-city errors
            if (multiErrorBox) {
                multiErrorBox.style.display = "none";
                multiErrorBox.textContent = "";
            }

            // Remove red borders
            ["from2", "to2", "date2"].forEach(id => {

                const input =
                    document.getElementById(id);

                if (input) {
                    input.classList.remove("input-error");
                }
            });
        });

        // Multi-city selected
        multiCity.addEventListener("change", function () {

            if (returnDate) {
                returnDate.style.display = "none";
            }

            if (multiCitySection) {
                multiCitySection.style.display = "flex";
            }
        });
    }


    // =====================================================
    // SEARCH BUTTON
    // =====================================================
    const searchButton =
        document.querySelector(".search-btn");

    // Add click event for search button
    if (searchButton) {

        searchButton.addEventListener(
            "click",
            searchFlights
        );
    }


    // =====================================================
    // MANAGE TRIP FORM
    // =====================================================
    const tripRef =
        document.getElementById("tripRef");

    const form =
        document.getElementById("manageForm");

    const lastName =
        document.getElementById("lastName");

    const errorMessage =
        document.getElementById("errorMessage");

    // Allow numbers only in trip reference
    if (tripRef) {

        tripRef.addEventListener("input", function () {

            this.value =
                this.value.replace(/\D/g, "");
        });
    }

    // Check if form exists
    if (
        form &&
        tripRef &&
        lastName &&
        errorMessage
    ) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            // Remove old errors
            tripRef.classList.remove("input-error");
            lastName.classList.remove("input-error");

            errorMessage.style.color = "red";
            errorMessage.textContent = "";

            let firstError = "";

            // Validate trip reference
            if (tripRef.value.trim() === "") {

                tripRef.classList.add("input-error");

                firstError =
                    "Trip reference no. is required.";
            }

            // Validate last name
            if (lastName.value.trim() === "") {

                lastName.classList.add("input-error");

                if (!firstError) {

                    firstError =
                        "Last name is required.";
                }
            }

            // Show first error
            if (firstError) {

                errorMessage.textContent =
                    firstError;

                return;
            }

            // Validate trip reference length
            if (tripRef.value.length !== 13) {

                tripRef.classList.add("input-error");

                errorMessage.textContent =
                    "Trip reference must be exactly 13 digits.";

                return;
            }

            // Validate first letter capitalization
            if (
                lastName.value[0] !==
                lastName.value[0].toUpperCase()
            ) {

                lastName.classList.add("input-error");

                errorMessage.textContent =
                    "Last name must start with a capital letter.";

                return;
            }

            // Success message
            errorMessage.style.color = "green";

            errorMessage.textContent =
                "Searching trip...";

            setTimeout(() => {

                errorMessage.textContent =
                    "Trip found successfully!";

                form.reset();

                setTimeout(() => {

                    errorMessage.textContent = "";

                }, 3000);

            }, 1500);
        });
    }


    // =====================================================
    // CALENDAR LOGIC
    // =====================================================
    const today =
        new Date().toISOString().split("T")[0];

    const departInput =
        document.getElementById("departDate");

    const returnInput =
        document.getElementById("returnDate");

    const date2Input =
        document.getElementById("date2");

    // Set minimum date for departure
    if (departInput) {

        departInput.min = today;
        departInput.value = today;

        // Update return and second leg date
        departInput.addEventListener(
            "change",
            function () {

                if (returnInput) {

                    returnInput.min =
                        this.value;
                }

                if (date2Input) {

                    date2Input.min =
                        this.value;
                }
            }
        );
    }

    // Set minimum date for return
    if (returnInput) {

        returnInput.min = today;
        returnInput.value = today;
    }

    // Set minimum date for second flight
    if (date2Input) {

        date2Input.min = today;
        date2Input.value = today;
    }

});


// =====================================================
// SEARCH FLIGHTS FUNCTION
// =====================================================
async function searchFlights() {

    // Error containers
    const errorBox =
        document.getElementById("flightError");

    const multiErrorBox =
        document.getElementById("multiError");

    // Main flight inputs
    const fromInput =
        document.getElementById("from");

    const toInput =
        document.getElementById("to");

    const departInput =
        document.getElementById("departDate");

    const returnInput =
        document.getElementById("returnDate");

    // Get values
    const from =
        fromInput?.value.trim();

    const to =
        toInput?.value.trim();

    const departDate =
        departInput?.value;

    const returnDateValue =
        returnInput?.value;

    // Trip type
    const returnTrip =
        document.getElementById("returnTrip")?.checked;

    const multiCity =
        document.getElementById("multiCity")?.checked;

    // Multi-city inputs
    const from2Input =
        document.getElementById("from2");

    const to2Input =
        document.getElementById("to2");

    const date2Input =
        document.getElementById("date2");

    const from2 =
        from2Input?.value.trim();

    const to2 =
        to2Input?.value.trim();

    const date2 =
        date2Input?.value;


    // =====================================================
    // RESET ERRORS
    // =====================================================
    document
        .querySelectorAll(".form-row input")
        .forEach(input => {

            input.classList.remove("input-error");
        });

    if (errorBox) {

        errorBox.style.display = "none";
        errorBox.textContent = "";
    }

    if (multiErrorBox) {

        multiErrorBox.style.display = "none";
        multiErrorBox.textContent = "";
    }

    let hasError = false;


    // =====================================================
    // MAIN FLIGHT VALIDATION
    // =====================================================

    // Validate departure location
    if (!from) {

        fromInput.classList.add("input-error");
        hasError = true;
    }

    // Validate destination
    if (!to) {

        toInput.classList.add("input-error");
        hasError = true;
    }

    // Validate departure date
    if (!departDate) {

        departInput.classList.add("input-error");
        hasError = true;
    }

    // Validate return date
    if (returnTrip && !returnDateValue) {

        returnInput.classList.add("input-error");
        hasError = true;
    }

    // Prevent same location
    if (
        from &&
        to &&
        from.toLowerCase() === to.toLowerCase()
    ) {

        fromInput.classList.add("input-error");
        toInput.classList.add("input-error");

        if (errorBox) {

            errorBox.style.display = "block";

            errorBox.textContent =
                "Origin and destination cannot be the same.";
        }

        hasError = true;
    }

    // Check if return date is earlier
    if (
        returnTrip &&
        returnDateValue &&
        returnDateValue < departDate
    ) {

        returnInput.classList.add("input-error");

        if (errorBox) {

            errorBox.textContent =
                "Return date cannot be earlier than departure date.";

            errorBox.style.display = "block";
        }

        hasError = true;
    }


    // =====================================================
    // MULTI CITY VALIDATION
    // =====================================================
    if (multiCity) {

        let multiHasError = false;

        // Validate second departure
        if (!from2) {

            from2Input.classList.add("input-error");
            multiHasError = true;
        }

        // Validate second destination
        if (!to2) {

            to2Input.classList.add("input-error");
            multiHasError = true;
        }

        // Validate second date
        if (!date2) {

            date2Input.classList.add("input-error");
            multiHasError = true;
        }

        // Prevent same location in second flight
        if (
            from2 &&
            to2 &&
            from2.toLowerCase() === to2.toLowerCase()
        ) {

            from2Input.classList.add("input-error");
            to2Input.classList.add("input-error");

            multiErrorBox.textContent =
                "Second flight origin and destination cannot be the same.";

            multiErrorBox.style.display = "block";

            multiHasError = true;
        }

        // Validate second flight date
        if (
            date2 &&
            date2 < departDate
        ) {

            date2Input.classList.add("input-error");

            multiErrorBox.textContent =
                "Second leg date cannot be earlier than first departure date.";

            multiErrorBox.style.display = "block";

            multiHasError = true;
        }

        // Show multi-city error
        if (multiHasError) {

            if (!multiErrorBox.textContent) {

                multiErrorBox.textContent =
                    "Please complete all required fields.";
            }

            multiErrorBox.style.display = "block";

            hasError = true;
        }
    }

    // Stop if validation fails
    if (hasError) return;


    // =====================================================
    // FETCH DATA FROM BACKEND SERVER
    // =====================================================
    try {

        const response = await fetch(
            "http://localhost:3000/search-flights",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    from,
                    to,
                    departDate,

                    returnDate:
                        returnDateValue,

                    tripType:
                        multiCity
                            ? "multi-city"
                            : returnTrip
                                ? "return"
                                : "one-way",

                    secondFlight:
                        multiCity
                            ? {
                                from: from2,
                                to: to2,
                                date: date2
                            }
                            : null
                })
            }
        );

        // Convert response to JSON
        const data =
            await response.json();

        console.log(data);


        // =====================================================
        // SUCCESS MESSAGE
        // =====================================================
        if (multiCity) {

            multiErrorBox.style.color =
                "green";

            multiErrorBox.style.background =
                "#e6ffe6";

            multiErrorBox.textContent =
                "Flight search successful!";

            multiErrorBox.style.display =
                "block";

        } else {

            errorBox.style.color =
                "green";

            errorBox.style.background =
                "#e6ffe6";

            errorBox.textContent =
                "Flight search successful!";

            errorBox.style.display =
                "block";
        }


        // =====================================================
        // DISPLAY FLIGHT RESULTS
        // =====================================================
        displayResults(`

            <div class="result-card">

                <h2>Available Flights</h2>

                ${data.flights.map(flight => `

                    <div class="flight-item">

                        <p>
                            <strong>Airline:</strong>
                            ${flight.airline}
                        </p>

                        <p>
                            <strong>From:</strong>
                            ${flight.from}
                        </p>

                        <p>
                            <strong>To:</strong>
                            ${flight.to}
                        </p>

                        <p>
                            <strong>Date:</strong>
                            ${flight.departDate}
                        </p>

                        <p>
                            <strong>Price:</strong>
                            ₱${flight.price}
                        </p>

                    </div>

                    <hr>

                `).join("")}

            </div>
        `);


        // =====================================================
        // AUTO CLEAR FORM
        // =====================================================
        setTimeout(() => {

            document
                .querySelectorAll(".form-row input")
                .forEach(input => {

                    input.value = "";

                    input.classList.remove(
                        "input-error"
                    );
                });

        }, 2000);

    } catch (error) {

        // =====================================================
        // SERVER ERROR
        // =====================================================
        console.error(error);

        if (errorBox) {

            errorBox.style.display = "block";

            errorBox.style.color = "red";

            errorBox.textContent =
                "Unable to connect to server.";
        }
    }
}


// =====================================================
// DISPLAY RESULTS FUNCTION
// =====================================================
function displayResults(content) {

    let resultsContainer =
        document.getElementById("results");

    // Create results container if not existing
    if (!resultsContainer) {

        resultsContainer =
            document.createElement("div");

        resultsContainer.id = "results";

        resultsContainer.style.marginTop =
            "20px";

        document
            .querySelector(".booking-box")
            .appendChild(resultsContainer);
    }

    // Insert HTML content
    resultsContainer.innerHTML = content;
}