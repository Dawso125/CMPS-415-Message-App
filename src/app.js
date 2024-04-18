const express = require("express");
var cookieParser = require("cookie-parser");

const userController = require("./routes/userController.js");
const homeController = require("./routes/homeController.js");

const app = express();

// present views using ejs
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// use the router. dont app.get or stuff
app.use(homeController, userController);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

module.exports = app;
