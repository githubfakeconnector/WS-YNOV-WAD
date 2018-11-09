const express  = require('express')
const app = express()
const port = 3000

const UserModel        = require('../models/UserModel')
const UserModelManager = require('../managers/UserModelManager')

const modelManagerArray = [];
modelManagerArray.push(UserModelManager)

var MongoClient = require('../mongodb/MongoClient.js')

// CONNECT to MongoDB
MongoClient._connect().then(() => {

    console.log('1: -------- MongoClient --------')
    console.log(MongoClient.toString())

    console.log('2: -------- CREATING EntityManagers --------')
    modelManagerArray.forEach(function(manager){
        manager._init(MongoClient)
    })

    // Server - Enable Listener once the DataBase is accessible
    app.listen(port, (err) => {
        if (err) {
            return console.log('ERROR Occured - CANCELED', err)
        }
        
        console.log(`3: -------- NodeJS Server - Listening on ${port} --------`)
    })
})

// ================= CRUD ================= //

// GET
app.get("/User", (request, response) => {

    if(request.query.firstName == undefined || request.query.firstName.trim() == "")
        response.send("No provided username")

    UserModelManager.getUserByName(request.query.firstName).exec(function(err, user){
        if(user == undefined || user.length == 0){
            throw404Error(response, 'Unfound user')
        }
        else {
           response.send(user)
        }
    })
})

app.post("/User", (request, response) => {

    var parameters = request.query

    // INPUT checkin
    if(!isValidUserInput(parameters))
        throw400Error(response, "Bad input, please provide a Username")

    // CHECK if the name is already used
    UserModelManager.getUserByName(request.query.name).exec(function(err, user){

        if(user != undefined && user.length > 0)
            throw400Error(response, "This name is already used")

        // CREATE & SAVE User
        UserModelManager.createUser(new UserModel(parameters))
                        .then(function(rep){
                            console.log("RESPONSE")
                            console.log(rep)
                            response.send(rep);
                        })
    })
})

function isValidUserInput(parameters){
    return parameters.lastName != undefined 
            && parameters.firstName != undefined
            && parameters.mail != undefined
            && parameters.phone != undefined
            && parameters.society != undefined
            && parameters.siret != undefined
            && parameters.newsletters != undefined
}

// ================= ERRORS ================= //
function throw500Error(response, message){
    response.status = 500;
    response.message = message;
}
function throw400Error(response, message){
    response.status = 400;
    response.send(message);
}
function throw404Error(response, message){
    response.status = 404;
    response.send(message);
}

