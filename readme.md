# Event Student Attendance Saver

This project is an Express server application designed to manage student attendance data using an Excel file and to send the data to specified WhatsApp numbers using Twilio's API.

## Features

- Upload and store student attendance data.
- Retrieve and send student attendance data via WhatsApp.
- Simple HTML form for data input.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Twilio account](https://www.twilio.com/)
- Excel file (`data.xlsx`) for storing student attendance

## Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/DeveloperKeshavKumar/attendance-tracker-express
    cd attendance-tracker-express
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root of the project and add your Twilio credentials:

    ```plaintext
    ACCOUNTSID=your_account_sid
    AUTHTOKEN=your_auth_token
    TWILIONUMBER=whatsapp:+your_twilio_whatsapp_number
    USEREMAIL=admin_username
    PASSWORD=admin_password
    ```

4. Ensure your Twilio number is enabled for WhatsApp and that your sandbox participants have joined using the code from the Twilio console.

## Running the Server

1. Start the server:

    ```sh
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## Endpoints

### GET /

Serves the HTML form for attendance input.

### POST /

Handles attendance data submission and stores it in an Excel file.

### GET /admin

Serves the HTML form for admin access control.

### POST /admin

Handles admin authentication and grants access to the attendance submission route for a specified time period.

### GET /send-data

Serves the HTML form for requesting attendance data.

### POST /send-data

Handles the request to send attendance data to a specified WhatsApp number.

## Project Structure

```plaintext
.
├── controllers
│   ├── attendance.js  # Contains logic for saving attendance to Excel file
│   ├── sendData.js    # Contains logic for handling attendance data and sending WhatsApp messages
|   ├── admin.js       # Contains logic for setting time for attendence 
├── public             # Stores static files
│   ├── logo.png
│   ├── style.css
│   ├── success.png
├── html
|   ├── admin.html     # HTML form for admin
│   ├── index.html     # HTML form for attendance input
│   ├── reqData.html   # HTML form for requesting attendance data
│   ├── success.html   # HTML page for success
├── data.xlsx          # Excel file for storing attendance data
├── .env               # Environment variables for Twilio credentials
├── package.json       # Project dependencies and scripts
├── README.md          # Project documentation
└── index.js           # Main server file
