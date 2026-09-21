const mongoose = require("mongoose")

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
    },
    password: {
        type: String,
        required: true
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
        default: "https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
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