const mongoose = require("mongoose")
const validator = require("validator")
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Enter correct email " + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter Strong Password" + value)
            }
        }
    },
    age: {
        type: String,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "other"].includes(value)) {
                throw new Error("Gender data is not valide")
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
        // validate(value){
        //     if(validator.isURL(value)){
        //         throw new Error("photo url is not correct " + value)
        //     }
        // }
    },
    about: {
        type: String,
        default: "Enter about your self"
    },
    skills: {
        type: [String]
    }
}, { timestamps: true })

// const User = mongoose.model("User" , userSchema)

module.exports = mongoose.model("User" , userSchema)