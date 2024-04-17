const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController.js");

// This is the router. Define Endpoints here and what happens at them.

// Home Page
router.get('/', async (req, res) => {
    res.send("HOME PAGE \n You can test the database connection at /testDb");
});

// Test the Database Connection
// This should always return the Admin user to the console
router.get('/testDb', async (req, res) => {
    const user = await userController.login("Admin", "admin1"); 
    if (user){
        console.log(user);
        res.send("Found the user!");

    } else {
        res.send("USER NOT FOUND!");
    }
    });

module.exports = router;
