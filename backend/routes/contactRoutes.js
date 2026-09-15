const express = require("express");

const {submitContact} = require("../controllers/contactController");
console.log("contactRoutes.js loaded");
const router = express.Router();
router.post("/", submitContact);
module.exports = router;