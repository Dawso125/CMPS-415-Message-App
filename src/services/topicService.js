const uri = require("../data/connectionString.js")
const DataContext = require("../data/datacontext.js")

const dataContext = DataContext.getInstance(uri)

async function getAllTopics() {
	try {
		await dataContext.connect()
		const database = dataContext.client.db("MyDBexample") // select the db
		const topicsCollection = database.collection("EXP-MONGO") // select the collection
		return await topicsCollection
			.find({ Title: { $exists: true } })
			.sort({ CreatedAt: -1 })
			.toArray() // find all topics and convert to array
	} finally {
		await dataContext.close();
	}
}

async function getAllSubscribedTopics(user_ID) {
	try {
		await dataContext.connect()
		const database = dataContext.client.db("MyDBexample") // select the db
		const topicsCollection = database.collection("EXP-MONGO") // select the collection

        const topics = await topicsCollection
        .find({ Subscribers: user_ID }) // Only retrieve topics where user_ID is present in Posts array
		.sort({ CreatedAt: -1 })
		.toArray();
        console.log(topics);
        return topics;
	} finally {
		await dataContext.close()
	}
}

async function postTopic(title) {
	try {
		await dataContext.connect()
		const database = dataContext.client.db("MyDBexample") // select the db
		const topicsCollection = database.collection("EXP-MONGO") // select the collection

		// find an existing topic first, prevent duplicates
		const existingTopic = await topicsCollection.findOne({ Title: title })

		if (existingTopic) {
			return { success: false }
		}
		console.log("Posting New Topic: ", title)
		var createdAt = Date.now().toString()
		var newTopic = {
			Title: title,
			Posts: [],
			Subscribers: [],
			CreatedAt: createdAt,
		}
		await topicsCollection.insertOne(newTopic)
		return { success: true }
	} finally {
		await dataContext.close()
	}
}

// a user can post a topic
async function postToTopic(title, post) {
	try {
		await dataContext.connect()
		const database = dataContext.client.db("MyDBexample") // select the db
		const topicsCollection = database.collection("EXP-MONGO") // select the collection

		// find the topic first
		const topic = await topicsCollection.findOne({ Title: title })
		if (!topic) {
			return { success: false }
		}

		const result = await topicsCollection.updateOne(
			{ Title: title },
			{ $push: { Posts: post } }
		)

		// This works by checking if anything in the record was modified
		// if its at least 1, then something was modified
		// which means the update worked
		if (result.modifiedCount === 1) {
			return { success: true }
		} else {
			return { success: false }
		}
	} finally {
		await dataContext.close()
	}
}

// add a user to the array of subscribers in a topic
async function subscribeToTopic(title, user_ID) {
	try {
		await dataContext.connect()
		const database = dataContext.client.db("MyDBexample") // select the db
		const topicsCollection = database.collection("EXP-MONGO")

		const topic = await topicsCollection.findOne({ Title: title })
		if (!topic) {
			return { success: false }
		}

		const result = await topicsCollection.updateOne(
			{ Title: title },
			{ $push: { Subscribers: user_ID } }
		)

		if (result.modifiedCount === 1) {
			return { success: true }
		} else {
			return { success: false }
		}
	} finally {
		await dataContext.close()
	}
}

module.exports = {
	getAllTopics,
	postTopic,
	postToTopic,
	subscribeToTopic,
    getAllSubscribedTopics,
}
