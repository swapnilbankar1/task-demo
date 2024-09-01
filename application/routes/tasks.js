const taskController = require('../controller/task');
const express = require("express");
const router = express.Router();

router.post("/create-task", taskController.createTask);
router.post("/get-tasks", taskController.getTasks);

module.exports = router;