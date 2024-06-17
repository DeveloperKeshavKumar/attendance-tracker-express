const path = require('path');
require('dotenv').config();

let isAdminAllowed = false;
let accessEndTime = null;

exports.adminForm = (req, res) => {
    res.sendFile(path.join(__dirname, "../html/admin.html"));
};

exports.admin = (req, res) => {
    console.log(req.body,);
    const { username, password, access, time } = req.body;
    if (username == process.env.USEREMAIL && password == process.env.PASSWORD) {
        if (access === 'true') {
            isAdminAllowed = true;
            accessEndTime = Date.now() + parseInt(time) * 60 * 1000; // Set access end time
            res.send('Access granted for ' + time + ' minutes.');
        } else if (access === 'false') {
            isAdminAllowed = false;
            res.send('Access denied.');
        }
    } else {
        res.send("You are Not Admin. <br> Call Admin to set the access to route.");
    }
}

exports.checkAccess = (req, res, next) => {
    if (isAdminAllowed && Date.now() < accessEndTime) {
        next();
    } else {
        isAdminAllowed = false; // Reset access if time has expired
        res.status(403).send('Ask Admin to Allow Attendence');
    }
};