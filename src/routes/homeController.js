// Import express
const express = require("express");

// Create a router
const homeController = express.Router();

// Home Page

homeController.get("/", async (req, res) => {
    // Render the home.ejs view
    res.render("home");
});

// Export the homeController
module.exports = homeController;
