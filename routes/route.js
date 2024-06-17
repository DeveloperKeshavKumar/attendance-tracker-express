const express = require("express");
const router = express.Router();

// Import Controllers 
const { getForm, postAttendence } = require("./../controllers/attendence");
const { getData, reqData } = require("./../controllers/sendData");

// Define Routes
router.get("/", getForm);
router.post("/", postAttendence);
router.get("/send-data", getData);
router.post("/send-data", reqData);

module.exports = router;