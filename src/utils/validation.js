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
    if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid")
    } 
}

module.exports = {validatoSignUpData , validateEmailId}