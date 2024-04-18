// Import express
const express = require("express");

// Create a router
const dashboardController = express.Router();

dashboardController.get('/dashboard', async function(req, res){
    const username = req.session.username;
    res.render('dashboard', { username: username, error: null });
});

module.exports = dashboardController;