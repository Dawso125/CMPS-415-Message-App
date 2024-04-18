// Import express
const express = require("express");

// Create a router
const dashboardController = express.Router();

dashboardController.get('/dashboard', async function(req, res){
    res.render('dashboard', {error: null});
});

module.exports = dashboardController;