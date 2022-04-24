const express = require("express");
const router = express.Router();
const Roles = require("../controllers/RolesController");
const { validateCreateRole } = require("../validator/role");

router.post("/", validateCreateRole, Roles);

module.exports = router;