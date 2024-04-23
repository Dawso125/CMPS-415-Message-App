// Import express
const express = require("express")
const topicService = require("../services/topicService.js")
const statusCodes = require("../data/statusCodes.js")

// Create a router
const dashboardController = express.Router()

dashboardController.get("/dashboard", async function (req, res) {
	try {
		const username = req.session.username
		const topics = await topicService.getAllTopics();
        console.log(topics);
		res.render("dashboard", { username: username, topics: topics, error: null })
	} catch (error) {
		console.log(statusCodes.NOT_FOUND)
		console.log("No Topics Found!")
	}
})

module.exports = dashboardController
