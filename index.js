const express = require('express');
const app = express();
const routes = require("./routes/route")
require("dotenv").config();

const port = process.env.PORT;

// Middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Middleware to serve static files from the 'public' directory
app.use(express.static("public"));

// Start the server and listen on port 3000
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/`);
});
