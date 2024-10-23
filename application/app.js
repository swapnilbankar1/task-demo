const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const path = require("path");
require('./db/create_database');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/user');

app.use(cors());
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

app.use("/api/tasks", taskRoutes);
app.use("/api/user", userRoutes);

module.exports = app;