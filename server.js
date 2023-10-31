const express = require("express");
const routes = require("./controllers");

//Heroku Server port
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("views"));
app.use(routes);

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));