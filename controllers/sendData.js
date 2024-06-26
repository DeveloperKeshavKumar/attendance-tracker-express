const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');
const twilio = require('twilio');
require('dotenv').config(); // Load environment variables from .env file

// Twilio credentials (get these from your Twilio account)
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const twilioNumber = process.env.TWILIONUMBER;

// Check if environment variables are properly loaded
if (!accountSid || !authToken || !twilioNumber) {
    throw new Error("Twilio credentials are required");
}

// Initialize Twilio client
const client = twilio(accountSid, authToken);

exports.getData = (req, res) => {
    res.sendFile(path.join(__dirname, "../html/reqData.html"));
};

exports.reqData = async (req, res) => {
    const { branch, year, phoneNumber } = req.body;

    // Define the path to the spreadsheet
    const filePath = path.join(__dirname, '../data.xlsx');

    try {
        // Load the workbook
        const workbook = XLSX.readFile(filePath);

        // Construct the sheet name based on branch and year
        const sheetName = `${branch}-${year}`;

        // Check if the sheet exists in the workbook
        if (workbook.SheetNames.includes(sheetName)) {
            // Get the worksheet
            const worksheet = workbook.Sheets[sheetName];

            // Convert worksheet to JSON array
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            const date = new Date().toLocaleString();
            // Prepare message
            let message = `Student Attendance as of ${date} for ${branch}-${year}th:\n`;

            // Append each student's data to the message
            jsonData.forEach((data) => {
                message += `${data["Roll No"]}\n`;
            });

            // Send WhatsApp message
            await client.messages.create({
                from: `whatsapp:${twilioNumber}`,
                body: message,
                to: `whatsapp:+91${phoneNumber}`
            });

            // Send success response
            res.send("Student data sent to WhatsApp successfully");
        } else {
            res.status(404).send(`Sheet ${sheetName} not found`);
        }
    } catch (err) {
        console.error("Error sending WhatsApp message:", err.message);

        if (err.status === 401) {
            res.status(401).send("Authentication failed: Invalid Twilio credentials");
        } else if (err.message.includes("Channel with the specified From address")) {
            res.status(400).send("Invalid From address: Ensure your Twilio number is WhatsApp-enabled \n"+ err);
        } else {
            res.status(500).send("Failed to send WhatsApp message \n"+ err);
        }
    }
};
