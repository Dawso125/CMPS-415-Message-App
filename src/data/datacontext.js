const { MongoClient } = require("mongodb");

// The DataContext will only be responsible for opening and closing connections to the Db
class DataContext {
    constructor(uri) {
        this.uri = uri;
        this.client = new MongoClient(uri);
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

    // Call this first to make sure a Datacontext does not yet exist
    // This can get the instance that already exists of dataContext
    static getInstance(uri) {
        if (!DataContext.instance) {
            DataContext.instance = new DataContext(uri);
        }
        return DataContext.instance;
    }

    
}

module.exports = DataContext;
