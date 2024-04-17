const express = require('express');
const router = express.Router();
const uri = "mongodb+srv://MongoUser:AY4WJU4csgbzGG9O@cluster0.2opxftr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DataContext = require("../data/datacontext.js");

// THIS tests if the data context actually connects to the db
async function testGetUser(){
    try {
        const dataContext = DataContext.getInstance(uri);
        const username = "Admin"; 
        const password = "admin1"; 
        const user = await dataContext.getUser(username, password); // fetch a user
        if (user) {
            console.log(user);
        } else {
            console.log("User not found"); // Log message if user is not found
        }
    } catch (error) {
        console.error("Error fetching user:", error);
    }
}

// Home Page
router.get('/', async (req, res) => {
    res.send("HOME PAGE \n You can test the database connection at /testDb");
});

router.get('/testDb', async (req, res) => {
    try {
        // Call testGetUser function
        await testGetUser();

        res.send("testGetUser function called successfully, check console for details"); // Send response
    } catch (error) {
        console.error("Error calling testGetUser function:", error);
        res.status(500).send("Failed to call testGetUser function"); // Send response for error
    }
})

module.exports = router;
