const express = require("express");
const homeController = express.Router();

// Home Page
homeController.get("/", async function (req, res){
    res.send("HOME PAGE \n You can test the database connection at /testDb");
  });

  module.exports = homeController;