const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const connection = require('../application/config/database');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);

module.exports = app;