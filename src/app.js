const express = require("express");
const session = require("express-session");
var cookieParser = require("cookie-parser");

const userController = require("./routes/userController.js");
const homeController = require("./routes/homeController.js");
const dashboardController = require("./routes/dashboardController.js");

const app = express();

app.use(session({
  secret: '1234',
  resave: false,
  saveUninitialized: true
}));

// present views using ejs
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// use the router. dont app.get or stuff
app.use(homeController, userController, dashboardController);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
