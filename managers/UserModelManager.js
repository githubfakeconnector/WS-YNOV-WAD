var UserModel = require('../models/UserModel.js')
const mongoose = require('mongoose')

class UserModelManager {
    constructor(){}

    _init(mongoClient){
        console.log("Initializing - UserModelManager")
        this.entityManager = mongoClient.getInstance().model(UserModel.getModelName(), UserModel.getJSONObject())
        console.log('UserModelManager connected: ' + this._isConnected())
    }

    getEntityManager(){
        return this.entityManager
    }

    _isConnected(){
        return this.entityManager != undefined    
    }

    createUser(userModel){

        if(!(userModel instanceof UserModel))
            return;

        return new this.entityManager(userModel.toJSON()).save()
    }

    getUserByName(firstName){
        return this.getEntityManager()
                   .find({firstName: firstName})
    }
}

module.exports = new UserModelManager()