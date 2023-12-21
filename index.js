const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config();
const jwt = require("jsonwebtoken"); // npm install jsonwebtoken
const cookieParser = require("cookie-parser"); // npm install cookie-parser

// init
const app = express()
const port = process.env.PORT || 5000;

// Middleware
// app.use(cors());
app.use(cors({
    origin: ["https://task-management-x.web.app", "http://localhost:5173", "http://localhost:5174"],
    // origin: ["https://job-market-x.web.app"],
    credentials: true
}));
app.use(express.json());
// app.use(express.json());
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send(`task Management X Server is listening on port ${port}!`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})