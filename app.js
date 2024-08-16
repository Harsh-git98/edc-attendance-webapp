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




const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const passport = require('passport');
const session = require('express-session');

// Create an Express app
const app = express();

// Setting up the template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Static files
app.use(express.static('public'));

// Express Session Middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
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

const url = `https://edc-attendance-app.onrender.com/todo`;

const interval = 30000;

function reloadWebsite() {
  axios.get(url)
    .then(response => {
      console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
    })
    .catch(error => {
      console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
    });
}

setInterval(reloadWebsite, interval);

const port = 3301;
// Listen to port
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
