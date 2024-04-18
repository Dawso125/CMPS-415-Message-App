const express = require("express");
const statusCodes = require("../data/statusCodes.js");
const userController = express.Router();

const userService = require("../services/userService.js");

// This is the router. Define Endpoints here and what happens at them.

// Test the Database Connection
// This should always return the Admin user to the console
userController.get("/testDb", async (req, res) => {
  const user = await userService.getUser("Admin", "admin1");
  if (user) {
    console.log(statusCodes.OK);
    console.log(user);
    res.send("Found the user!");
  } else {
    console.log(statusCodes.NOT_FOUND);
    res.send("USER NOT FOUND!");
  }
});

userController.get('/login', (req, res) => {
  res.render('login', { error: null });
});

userController.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
      const user = await userService.getUser(username, password);
      if (user) {
          console.log(statusCodes.OK);
          console.log("Logging in: ", user);
          res.redirect('/');
      } else {
          // User not found or invalid credentials
          res.render('login', { error: 'Invalid username or password' });
      }
  } catch (error) {
      // Handle other errors (e.g., database error)
      console.error('Login error:', error);
      res.status(500).send('Internal Server Error');
  }
});


module.exports = userController;
