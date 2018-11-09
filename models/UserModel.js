class UserModel {

    constructor(parameters){
        this.lastName   = parameters.lastName
        this.firstName  = parameters.firstName
        this.mail       = parameters.mail
        this.phone      = parameters.phone
        this.society    = parameters.society
        this.siret      = parameters.siret
        this.newsletter = parameters.newsletter
        this.created    = parameters.created
        this.isActive   = parameters.isActive

        this.toJSON = function(){
            return {
                lastName: this.lastName,
                firstName: this.firstName,
                mail: this.mail,
                phone: this.phone,
                society: this.society,
                siret: this.siret,
                newsletter: this.newsletter,
                created: this.created,
                isActive: this.isActive
            }
        }
    } 
    
    static getModelName(){
        return "user"
    }
    static getJSONObject(){
        return  {
                    lastname    : {type: String, required: true},
                    firstname   : {type: String, required: true},
                    society     : {type: String, required: true},
                    siret       : {type: String, required: true},
                    mail        : {type: String, required: true},
                    phone       : {type: String, required: true},
                    created     : {type: Date, default: new Date()},
                    newsletter  : {type: Boolean, default: true},
                    isActive    : {type: Boolean, default: true}
                }
    }  
}

module.exports = UserModel
