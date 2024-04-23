const { MongoClient } = require("mongodb");
const uri = require("../data/connectionString.js");

// The DataContext will only be responsible for opening and closing connections to the Db
class DataContext {
  constructor(uri) {
    if (!DataContext.instance) {
      this.uri = uri;
      this.client = new MongoClient(this.uri);
      DataContext.instance = this;
      console.log("DataContext instance created");
    }
    return DataContext.instance;
  }

  async connect() {
    try {
      await this.client.connect();
      console.log("Connected dataContext to Database");
    } catch (error) {
      console.error("Error connecting dataContext to database:", error);
      throw error;
    }
  }

  async close() {
    try {
      await this.client.close();
      console.log("Disconnected dataContext from Database");
    } catch (error) {
      console.error("Error connecting dataContext to database:", error);
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

module.exports = DataContext
