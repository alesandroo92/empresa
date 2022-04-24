const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const { validateCreateUser } = require("../validator/user"); 

router.post("/signin", AuthController.signIn);
router.post("/signup", validateCreateUser, AuthController.signUp);

module.exports = router;
