const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/search-flights", async (req, res) => {

    const {
        from,
        to,
        departDate
    } = req.body;

    // SAMPLE RESPONSE
    const flights = [
        {
            airline: "Philippine Airlines",
            from,
            to,
            departDate,
            price: 5200
        },
        {
            airline: "Cebu Pacific",
            from,
            to,
            departDate,
            price: 4300
        }
    ];

    res.json({
        success: true,
        flights
    });

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});