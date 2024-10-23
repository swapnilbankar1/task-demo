const userController = require('../controller/user');
const express = require("express");
const router = express.Router();

router.post("/register-user", userController.registerUser);
router.get("/get-user", userController.getUsers);
router.post("/login", userController.login);
router.get("/profile", userController.verifyToken, userController.getProfile);

module.exports = router;