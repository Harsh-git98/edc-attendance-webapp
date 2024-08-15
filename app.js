const express = require('express');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();

// Setting up the template engine
app.set('view engine', 'ejs');
app.set('views', './views');
// Static files
app.use(express.static('public'));

// Fire controllers
const todoController = require('./controllers/todoController');
todoController(app);

const port =3300;
// Listen to port
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
