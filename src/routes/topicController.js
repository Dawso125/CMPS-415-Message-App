const express = require("express");
const statusCodes = require("../data/statusCodes.js");
const topicService = require("../services/topicService.js");

const topicController = express.Router();

topicController.get("/createTopic", async function (req, res) {
	res.render("createTopic");
});

topicController.post("/createTopic", async function (req, res) {
	const { title } = req.body;
	try {
		const result = await topicService.postTopic(title);
		if (result.success) {
			console.log("New Topic Created: ", title);
			res.redirect("/dashboard"); // Redirect to dashboard after creating topic
		} else {
			console.log(statusCodes.BAD_REQUEST);
			console.log("Topic already Exists");
		}
	} catch (error) {
		console.log("Error creating topic:", error);
		console.log(statusCodes.BAD_REQUEST);
	}
});

topicController.post('/postToTopic', async function (req, res){
	const {title, post} = req.body;

	try {
		const result = await topicService.postToTopic(title, post);

		if (result.success){
			console.log("Post added to topic:", title);
            res.redirect("/dashboard");
		}
	} catch (error){
		console.log(statusCodes.BAD_REQUEST);
		console.log("Failed to add post to topic: ", error);
	}
});

// subscribe to the topic. This places the current logged in user in the 
// subscribers array in the topic
topicController.post('/subscribeToTopic', async function (req, res){
	const {title}= req.body;
	var user_ID = req.session.username;
	try {
		const result = await topicService.subscribeToTopic(title, user_ID);

		if (result.success){
			console.log(user_ID," has been subscribed to", title);
			res.redirect('/dashboard');
		}
	} catch (error){
		console.log(statusCodes.BAD_REQUEST);
		console.log("Failed to subscribe to topic", error);
	}
});

topicController.post('/unsubscribeFromTopic', async function (req, res){
	const {title}= req.body;
	var user_ID = req.session.username;
	try {
		const result = await topicService.unsubscribeFromTopic(title, user_ID);
		if (result.success){
			console.log(user_ID," has been subscribed to", title);
			res.redirect('/dashboard');
		}
	} catch (error){
		console.log(statusCodes.BAD_REQUEST);
		console.log("Failed to unsubscribe from topic", error);
	}
});

module.exports = topicController;
