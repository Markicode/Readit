// Import packages
import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import 'dotenv/config';
import axios from 'axios';

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
let reports = [];
let loggedIn = false;

// Use middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded());
app.use(authoriseUsage);

// GET Homepage
app.get("/", async (req, res) => {
    const usersResult = await db.query("SELECT * FROM users");
    users = usersResult.rows;
    const reportsResult = await db.query("SELECT * FROM books");
    reports = reportsResult.rows;
    for(const report of reports)
    {
        //const response = await axios.get(`https://covers.openlibrary.org/b/isbn/${report.isbn}-M.jpg`);
        console.log(report);
    }
    console.log(users);
    res.render("index.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.get("/account", (req, res) => {
    res.render("account.ejs");
});


// Run app
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

function authoriseUsage(req, res, next)
{
    const openPaths = ["/", "/login"];
    console.log(req.path);
    if(openPaths.includes(req.path)) 
    {
        next();
    }
    else
    {
        if(loggedIn === true)
        {
            next();
        }
        else
        {
            return res.render("noauth.ejs");
        }
    }
}