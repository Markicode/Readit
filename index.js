// Import packages
import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';

// App config
const app = express();
const port = 8080;
const db = new pg.Pool({
    host: "localhost",
    user: "postgres",
    password: "Welkom123!",
    database: "readit",
    port: 5432
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
