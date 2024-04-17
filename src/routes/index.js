const express = require('express');
const router = express.Router();
const DataContext = require("../data/datacontext.js");
const uri = "mongodb+srv://MongoUser:AY4WJU4csgbzGG9O@cluster0.2opxftr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// THIS FUCKTION tests if the data context actually connects to the db
async function testGetUser(){
    try {
        const dataContext = DataContext.getInstance(uri); // Correctly call static method
        const username = "Admin"; // Username to search for
        const password = "admin1"; // Password to search for
        const user = await dataContext.getUser(username, password); // Call getUser method to fetch user model
        if (user) {
            console.log("User found: " + JSON.stringify(user));
        } else {
            console.log("User not found"); // Log message if user is not found
        }
    } catch (error) {
        console.error("Error fetching user:", error);
    }
}

// Home Page
router.get('/', async (req, res) => {
    try {
        // Call testGetUser function
        await testGetUser();

        res.send("testGetUser function called successfully"); // Send response
    } catch (error) {
        console.error("Error calling testGetUser function:", error);
        res.status(500).send("Failed to call testGetUser function"); // Send response for error
    }
});

module.exports = router;
