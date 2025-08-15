// Import packages
import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import 'dotenv/config';

// App config
const app = express();
const port = process.env.APP_PORT;
const db = new pg.Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    port: process.env.DATABASE_PORT
});

let users = [];

// Use middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded());

// GET Homepage
app.get("/", async (req, res) => {
    const result = await db.query("SELECT * FROM users");
    users = result.rows;
    console.log(users);
    res.render("index.ejs");
});


// Run app
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
