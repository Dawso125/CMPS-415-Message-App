const express = require("express");
const statusCodes = require("../data/statusCodes.js");
const userController = express.Router();

const userService = require("../services/userService.js");

// This is the router. Define Endpoints here and what happens at them.

// Test the Database Connection
// This should always return the Admin user to the console
userController.get("/testDb", async function (req, res){
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

userController.get('/login', async function (req, res){
  res.render('login', { error: null });
});

userController.post('/login', async function (req, res){
  const { username, password } = req.body;
  try {
      const user = await userService.getUser(username, password);
      if (user) {
          console.log(statusCodes.OK);
          console.log("Logging in: ", user);
          res.redirect('/');
      } else {
          console.log(statusCodes.BAD_REQUEST);
          res.render('login', { error: 'Invalid login credentials' });
      }
  } catch (error) {
      // if you hit this, something went horribly uncorrect
      console.error('Login error:', error);
      res.status(500).send('Internal Server Error');
  }
});

userController.get('/register', async function (req, res){
  res.render('register', { error: null });
});

userController.post('/register', async function (req, res){
  const { username, password } = req.body;
  try {
    const result = await userService.registerUser(username, password);
    if (result.success) {
      // Registration successful, redirect or send response accordingly
      res.redirect('/login'); // Redirect to login page
    } else {
      // Handle other cases if needed
    }
  } catch (error){
    console.log(statusCodes.BAD_REQUEST, error);

  }
});


module.exports = userController;
