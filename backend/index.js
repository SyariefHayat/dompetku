require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { API_PORT, MONGO_URL } = process.env;

const app = express();

const routes = require("./routes/index.route");

const PORT = API_PORT || 3000;

app.use(express.json());
app.use(cors());

// database connection
mongoose.connect(MONGO_URL).catch((error) => {
    if (error) {
        console.log("Failed connect to MongoDB");
        throw error;
    }
    console.log("Connected to MongoDB");
})

app.use(routes)

app.listen(PORT, (req, res) => {
    console.log(`Server is running on http://localhost:${PORT}`);
})