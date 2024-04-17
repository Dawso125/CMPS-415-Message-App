const uri = require("../data/connectionString.js");
const DataContext = require("../data/datacontext.js");

// get the instance first. Just like in a C# app
const dataContext = DataContext.getInstance(uri);

// this function can grab a user anytime you need one for whatever
async function getUser(username, password) {
    try {
        await dataContext.connect();
        const database = dataContext.client.db('MyDBexample');
        const users = database.collection('EXP-MONGO');
        const query = { user_ID: username, Password: password };
        return await users.findOne(query);
    } finally {
        await dataContext.close(); // always close it
    }
}

module.exports = {
    getUser
}