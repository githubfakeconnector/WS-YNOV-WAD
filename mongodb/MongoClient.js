const mongoose = require('mongoose')

const server   = 'localhost'; 
const database = 'ws-ynov-wad';

class MongoClient {

    constructor() {
        this.mongoose    = mongoose;
        this.schemaClass = mongoose.Schema;
    }

    async _connect() {
        if(!this.instance)
            await mongoose  .connect(`mongodb://${server}/${database}`, { useNewUrlParser: true })
                            .then((db) => {
                                console.log(`MongoDB - Connected to ${database}`)
                                this.instance = db;
                            })
                            .catch(err => {
                                console.error(`MongoDB - ERROR Occured while connecting to ${database}: ` + err)
                            })
    }

    getMongoose(){
        return this.mongoose
    }

    getInstance() {
        return this.instance;
    }

    getSchema(){
        return this.schemaClass;
    }

    toString(){
        if(this.instance != undefined)
            return 'MongoClient successfully connected'
        else
            return 'ERROR: Not connected yet !'
    }
  }

module.exports = new MongoClient()