const uri = require("../data/connectionString.js")
const DataContext = require("../data/datacontext.js")

const dataContext = DataContext.getInstance(uri)

async function getAllTopics() {
	try {
		await dataContext.connect();
		const database = dataContext.client.db("MyDBexample"); // select the db
		const topicsCollection = database.collection("EXP-MONGO"); // select the collection
		return await topicsCollection.find({ Title: { $exists: true } }).toArray(); // find all topics and convert to array
	} finally {
		await dataContext.close();
	}
}

async function postTopic(title){
    try{
        await dataContext.connect();
		const database = dataContext.client.db("MyDBexample"); // select the db
		const topicsCollection = database.collection("EXP-MONGO"); // select the collection

        const existingTopic = await topicsCollection.findOne({Title: title});

        if (existingTopic){
            return {success: false};
        }
        console.log("Posting New Topic: ", title);
        var createdAt = Date.now().toString();
        var newTopic = {
            Title: title,
            Posts: [], // Insert the post into an array
            Subscribers: [],
            CreatedAt: createdAt
        }
        await topicsCollection.insertOne(newTopic);
        return {success: true};
    } finally {
        await dataContext.close();
    }
}

module.exports = {
    getAllTopics,
    postTopic,
}