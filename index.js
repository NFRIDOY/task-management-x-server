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

// Verify

const verifyToken = async (req, res, next) => {
    const token = req.cookies?.token;
    const emailReq = req.query.email;

    console.log(token);
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized Access, No Token' })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized Access' })
        }
        console.log("verifyToken: verify")
        console.log("decoded", decoded)
        req.user = decoded;
        // if (req.user.email === emailReq) {
        //     return res.status(403).send({ message: 'Forbiden Access' })
        // }

        next()
    })
}

// MongoDB
// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASS)
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hlezmce.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // client.connect();

        // Operations
        const database = client.db("TaskManagementXDB");
        const tasksCollection = database.collection("Tasks")



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send(`Task Management X Server is listening on port ${port}!`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})