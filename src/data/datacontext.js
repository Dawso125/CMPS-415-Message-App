const { MongoClient } = require("mongodb");


class DataContext {
    constructor(uri) {
        this.uri = uri;
        this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("DataContext instance created"); // Add debug statement
    }

    async connect() {
        try {
            await this.client.connect();
            console.log("Connected to MongoDB");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw error;
        }
    }

    async close() {
        try {
            await this.client.close();
            console.log("Disconnected from MongoDB");
        } catch (error) {
            console.error("Error closing MongoDB connection:", error);
            throw error;
        }
    }

    static getInstance(uri) {
        console.log("getInstance() called"); // Add debug statement
        if (!DataContext.instance) {
            DataContext.instance = new DataContext(uri);
        }
        return DataContext.instance;
    }

    async getUser(username, password) {
        try {
            await this.connect();
            const database = this.client.db('MyDBexample');
            const users = database.collection('EXP-MONGO');
            const query = { user_ID: username, Password: password };
            return await users.findOne(query);
        } finally {
            await this.close();
        }
    }

    
}

module.exports = DataContext;
