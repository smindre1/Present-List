const express = require('express');
const routes = require('./controllers');
const path = require('path');
const session = require('express-session');
const sequelize = require('./config/connection');
//const handlebars = require("handlebars");
const exphbs = require('express-handlebars');
//const helpers = require('./utils/helpers');

//Heroku Server port
const PORT = process.env.PORT || 3001;

const app = express();

const hbs = exphbs.create({});

// Middleware for parsing JSON and urlencoded form data
// Create the Handlebars.js engine object with custom helper functions
//const hbs = exphbs.create({ helpers });

// Inform Express.js which template engine we're using
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

//app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));

//////

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});