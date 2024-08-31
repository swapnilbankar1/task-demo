const taskController = require('../controller/task');
const express = require("express");
const router = express.Router();

router.post("/create-task", taskController.createTask);

module.exports = router;