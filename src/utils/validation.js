const validator = require("validator");

const validatoSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("Firstname or last name required")
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Invalid Email")
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Enter Strong Password")
    }
}

const validateEmailId = (emailId) => {
    if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid")
    }
}

const validationOfEditData = (req) => {
    const allowedFields = ["firstName", "lastName", "gender", "skills", "photoUrl", "about" , "age" ]
    const isValidFields = Object.keys(req.body).every(k => allowedFields.includes(k));
    if (!isValidFields) {
        throw new Error("Invalid fileds for edit")
    }
    const {firstName , lastName , gender , skills , about , age} = req.body
     if (!["male", "female", "other"].includes(gender)) {
        throw new Error("Invalid gender")
    } else if (skills && skills.length > 10) {
        throw new Error("Not more then 10 skills")
    } else if (about && about.length > 200) {
        throw new Error("Not more then 200 cherecter")
    } else if(age < 18){
        throw new Error("Age should be more then 18")
    }
}

module.exports = { validatoSignUpData, validateEmailId, validationOfEditData }