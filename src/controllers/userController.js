const statusCodes = require("../data/statusCodes.js");
const userService = require("../services/userService.js");

// The controller is only going to handle requests. No logic goes here. Only Http Responses.

// this can be used to login a user, expanded on it with error catching
async function login(User_ID, Password) {
        const user = await userService.getUser(User_ID, Password); // run the function in the service
        try{
        if (user){
            console.log(statusCodes.OK);
            return user;

        } else {
            console.log(statusCodes.NOT_FOUND);
            return null;

        }
    } catch (e) {
        console.error("if you hit this something went horribly uncorrect");

    }

}

module.exports = {
    login
}