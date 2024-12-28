const express = require('express');//EJS APPLICATION
const bodyParser = require('body-parser');// TO PARSE DATA
const axios = require('axios');// TO MAKE HTTP REQUESTS
const passport = require('passport');// TO AUTHENTICATE USERS
const session = require('express-session');// TO MAINTAIN SESSIONS

// Create an Express app
const app = express();//MAIN APP

app.set('view engine', 'ejs'); //EJS ENGINE
app.set('views', './views');//VIEWS WHERE THE EJS FILES ARE LOCATED

// Static files
app.use(express.static('public'));//PUBLIC FOLDER WHERE CSS AND JS FILES ARE LOCATED

// Express Session Middleware
app.use(session({
    secret: 'your_secret_key',//
    resave: false,//
    saveUninitialized: true 
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Fire controllers
const todoController = require('./controllers/todoController');

const loginController = require('./controllers/logincontrol');

todoController(app);
loginController(app);


const port = 3301;
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});







//WEBSITE RELOADER RENDER.COM SOLUTION


// const url = `https://edc-attendance-app.onrender.com/todo`;

// const interval = 30000;

// function reloadWebsite() {
//   axios.get(url)
//     .then(response => {
//       console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
//     })
//     .catch(error => {
//       console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
//     });
// }

// setInterval(reloadWebsite, interval);
























// const express = require('express');
// const bodyParser = require('body-parser');
// const axios = require('axios');


// // Create an Express app
// const app = express();

// // Setting up the template engine
// app.set('view engine', 'ejs');
// app.set('views', './views');
// // Static files
// app.use(express.static('public'));

// // Fire controllers
// const todoController = require('./controllers/todoController');
// todoController(app);

// const login =require('./controllers/logincontrol');
// login(app);

// const url = `https://edc-attendance-app.onrender.com/todo`;



// const interval = 30000;

// function reloadWebsite() {
//   axios.get(url)
//     .then(response => {
//       console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
//     })
//     .catch(error => {
//       console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
//     });
// }

// setInterval(reloadWebsite, interval);

// const port =3301;
// // Listen to port
// app.listen(port, () => {
//     console.log(`Listening to port ${port}`);
// });