const uri = require("../data/connectionString.js");
const DataContext = require("../data/datacontext.js");

// get the instance first. Just like in a C# app
const dataContext = DataContext.getInstance(uri);

// this function can grab a user anytime you need one for whatever
async function getUser(user_ID, Password) {
  try {
    await dataContext.connect(); // open a connection to the db
    const database = dataContext.client.db("MyDBexample"); // select the db
    const users = database.collection("EXP-MONGO"); // select the collection
    const query = { user_ID: user_ID, Password: Password }; // query = username, password
    return await users.findOne(query); // find a record with matching username, password
  } finally {
    await dataContext.close(); // always close it
  }
}

// async function registerUser(user_ID, Password){
//   try {
//     await dataContext.connect();
//     const database = client.db('MyDBexample');
//     const users = database.collection('EXP-MONGO');

//     const existingUser = await users.findOne({user_ID});
    
//   }
// }

module.exports = {
  getUser,
};
