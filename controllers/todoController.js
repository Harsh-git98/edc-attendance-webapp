// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
// const geolib = require('geolib');


// // Middleware for parsing URL-encoded data
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

// // Sample data
// let meetData = null;
// let attendees = [];

// module.exports = function(app) {

//     app.get('/todo', function(req, res) {
//         res.render('todo', { todos: attendees, meetActive: !!meetData });
//     });
    

//     // Create Meet
//     app.post('/create-meet', urlencodedParser, function(req, res) {
//         if (!meetData) {
//             meetData = {
//                 latitude: req.body.latitude,
//                 longitude: req.body.longitude,
//                 time: new Date()
//             };
//             attendees = [];
//             res.json({ success: true });
//             console.log("meet created succesfully");
//         } else {
//             res.json({ success: false, message: "Meet already active" });
//             console.log("meet is active already");
//         }
//     });

//     // Mark Attendance
//     app.post('/mark-attendance', urlencodedParser, function(req, res) {
//         if (meetData) {
//             const { latitude, longitude, name } = req.body;
//             const distance = calculateDistance(meetData.latitude, meetData.longitude, latitude, longitude);
            
//             if (distance <=20) {
//                 attendees.push({ name, latitude, longitude });
//                 res.json({ success: true });
//                 console.log("attendees data added");
//             } else {
//                 res.json({ success: false, message: "You are too far from the meet location" });
//                 console.log("attendees data not added");
//             }
//         } else {
//             res.json({ success: false, message: "No active meet" });
//             console.log("no meet active");
//         }
//     });

//     // End Meet
//     app.post('/end-meet', function(req, res) {
//         if (meetData) {
//             sendAttendanceEmail(attendees);
//             meetData = null;
//             attendees = [];
//             res.json({ success: true });
//         } else {
//             res.json({ success: false, message: "No active meet to end" });
//         }
//     });

//     // Redirect all other requests to /todo
    
    

//     app.get('/login', function(req, res) {
//         res.render('login');
//     });
//     app.get('/*', function(req, res) {
//         res.redirect('/todo');
//     });

    
//     // Utility functions
//     // function calculateDistance(lat1, lon1, lat2, lon2) {
//     //     const R = 6371e3; // Earth radius in meters
//     //     const φ1 = lat1 * Math.PI/180;
//     //     const φ2 = lat2 * Math.PI/180;
//     //     const Δφ = (lat2-lat1) * Math.PI/180;
//     //     const Δλ = (lon2-lon1) * Math.PI/180;

//     //     const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
//     //               Math.cos(φ1) * Math.cos(φ2) *
//     //               Math.sin(Δλ/2) * Math.sin(Δλ/2);
//     //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

//     //     const distance = R * c; // in meters
//     //     return distance;
//     // }


// function calculateDistance(lat1, lon1, lat2, lon2) {
//     return geolib.getDistance(
//         { latitude: lat1, longitude: lon1 },
//         { latitude: lat2, longitude: lon2 }
//     );
// }

//     function sendAttendanceEmail(attendees) {
//         // Set up nodemailer transport
//         const transporter = nodemailer.createTransport({
//             service: 'Gmail',
//             auth: {
//                 user: 'shriharshranjangupta@gmail.com',
//                 pass: 'emmc axzp ztyk eaik'
//             }
//         });

//         // Email options
//         const mailOptions = {
//             from: 'shriharshranjangupta@gmail.com',
//             to: 'hitrjn@gmail.com',
//             subject: 'EDC Meet Attendance',
//             text: `Attendees of meet at: ${attendees.map(a => a.name).join(', ')}`
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 return console.log(error);
//             }
//             console.log('Email sent: ' + info.response);
//         });
//     }
// };



const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const geolib = require('geolib');

const axios = require('axios'); // Ensure you `npm install axios`


// Middleware for parsing URL-encoded data
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Sample data
let meetData = null;
let attendees = [];

module.exports = function(app) {

    // app.get('/todo', function(req, res) {
    //     res.render('todo', { todos: attendees, meetActive: !!meetData, user: req.user });
    // });

    // Create Meet
    app.post('/create-meet', urlencodedParser, function(req, res) {
        if (!meetData) {
            meetData = {
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                time: new Date()
            };
            attendees = [];
            res.json({ success: true });
            console.log("Meet created successfully");
        } else {
            res.json({ success: false, message: "Meet already active" });
            console.log("Meet is active already");
        }
    });

    // Mark Attendance
    app.post('/mark-attendance', urlencodedParser, function(req, res) {
        if (meetData) {
            const { latitude, longitude, name } = req.body;
            const distance = calculateDistance(meetData.latitude, meetData.longitude, latitude, longitude);
            
            if (distance <= 20) {
                attendees.push({ name, latitude, longitude });
                res.json({ success: true });
                console.log("Attendee data added");
            } else {
                res.json({ success: false, message: "You are too far from the meet location" });
                console.log("Attendee data not added");
            }
        } else {
            res.json({ success: false, message: "No active meet" });
            console.log("No meet active");
        }
    });

    // End Meet
    app.post('/end-meet', function(req, res) {
        if (meetData) {
            // sendAttendanceEmail(attendees);
            const urlsheet="https://script.google.com/macros/s/AKfycbwkjtMV_yANO_Drih82rFLJheknkQaik2uhqju_CLpLaLMehcoBpcXrNo33zZcl_LpY/exec";
            const payload = { attendees: JSON.stringify(attendees) };
    
    
        axios.post(urlsheet, payload)
        .then(response => console.log(response.data))
        .catch(error => console.error('Error:', error));
            meetData = null;
            attendees = [];
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "No active meet to end" });
        }
    });

    // Utility functions
    function calculateDistance(lat1, lon1, lat2, lon2) {
        return geolib.getDistance(
            { latitude: lat1, longitude: lon1 },
            { latitude: lat2, longitude: lon2 }
        );
    }

    

    function sendAttendanceEmail(attendees) {
        // Set up nodemailer transport



        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'shriharshranjangupta@gmail.com',
                pass: 'emmc axzp ztyk eaik'
            }
        });

        // Email options
        const mailOptions = {
            from: 'shriharshranjangupta@gmail.com',
            to: 'hitrjn@gmail.com',
            subject: 'EDC Meet Attendance',
            text: `Attendees of meet: ${attendees.map(a => a.name).join(', ')}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Email sent: ' + info.response);
        });
    }
};
