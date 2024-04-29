const express = require("express");
const topicService = require("../services/topicService.js");
const statusCodes = require("../data/statusCodes.js");

const unsubscribedTopicsController = express.Router();

unsubscribedTopicsController.get('/unsubscribedTopics', async function (req, res){
  try {
    const username = req.session.username;
    const topics = await topicService.getAllNonSubscribedTopics(username);
    console.log("Fetching all unsubscribed Topics: ", topics);
		res.render("unsubscribedTopics", { username: username, topics: topics, error: null })
  } catch (error){
    console.log(statusCodes.NOT_FOUND);
    console.log("No Unsubscribed Topics found!");
  }
});

module.exports = unsubscribedTopicsController;