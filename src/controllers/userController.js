const statusCodes = require("../data/statusCodes.js");
const userService = require("../services/userService.js");

// The controller is only going to handle requests. No logic goes here. Only Http Responses.

// this can be used to login a user, expand on it with error catching
async function login(User_ID, Password) {
        const user = await userService.getUser(User_ID, Password); // run the function in the service

        if (user){
            console.log(statusCodes.OK);
            return user;

        } else {
            console.log(statusCodes.NOT_FOUND);
            return null;

        }

}

module.exports = {
    login
}