const express = require("express")
const statusCodes = require("../data/statusCodes.js")
const userController = express.Router()

const userService = require("../services/userService.js")

// This is the router. Define Endpoints here and what happens at them.

// Test the Database Connection
// This should always return the Admin user to the console
userController.get("/testDb", async function (req, res) {
	const user = await userService.getUser("Admin", "admin1")
	if (user) {
		console.log(statusCodes.OK)
		console.log(user)
		res.send("Found the user!")
	} else {
		console.log(statusCodes.NOT_FOUND)
		res.send("USER NOT FOUND!")
	}
});

// login endpoint
userController.get("/login", async function (req, res) {
	try {
		res.render("login", { error: null })
	} catch (error) {
		res.render("notFound", { error: "Error loading page" })
	}
});

// post the login request
userController.post("/login", async function (req, res) {
	const { username, password } = req.body
	try {
		const user = await userService.getUser(username, password)
		if (user) {
			console.log(statusCodes.OK)
			console.log("Logging in: ", user)
			req.session.username = username // set the session user
			res.redirect("/dashboard")
		} else {
			console.log(statusCodes.BAD_REQUEST)
			res.render("login", { error: "Invalid login credentials" })
		}
	} catch (error) {
		// if you hit this, something went horribly uncorrect
		console.error("Login error:", error)
		console.log(statusCodes.BAD_REQUEST, error)
	}
});

//register endpoint
userController.get("/register", async function (req, res) {
	try {
		res.render("register", { error: null })
	} catch (error) {
		res.render("notFound", { error: "Error loading page" })
	}
});

// this will register a new user, they will be asked to log in since we dont return
// the registered user. We can if we want to
userController.post("/register", async function (req, res) {
	const { username, password } = req.body
	try {
		const result = await userService.registerUser(username, password)
		if (result.success) {
			res.redirect("/login") // Redirect to login page
		} else {
			res.render("register", { error: "Username is already in use!" })
		}
	} catch (error) {
		// if you hit this, something went horribly uncorrect
		console.log(statusCodes.BAD_REQUEST, error)
	}
});

module.exports = userController
