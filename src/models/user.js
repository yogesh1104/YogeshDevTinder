const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
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


userSchema.methods.getJWT = function(){
    const user = this;
    const token = jwt.sign({ _id: user._id }, "Dev@Tinder" ,  { expiresIn: '1h' })
    return token
}

userSchema.methods.isPasswordValid = async function(passwordByUser){
    const user = this
    const isValidPassword = await bcrypt.compare(passwordByUser, user.password)
    return isValidPassword;
}
// const User = mongoose.model("User" , userSchema)

module.exports = mongoose.model("User" , userSchema)