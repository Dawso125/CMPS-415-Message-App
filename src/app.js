const express = require('express');
var cookieParser = require('cookie-parser');
var path = require("path");

const router = require("./routes/index.js");

const app = express();

// present views using ejs
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// use the router
app.use(router);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;