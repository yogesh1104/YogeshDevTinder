const express = require("express");
const bcrypt = require("bcrypt")
const User = require("../models/user");
const { validatoSignUpData, validateEmailId } = require("../../../../../../../home/yoro/Project/DevTinder/src/utils/validation");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {

    try {
        //validation of signup data
        validatoSignUpData(req)
        //Encrpt password data
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10)
        const user = new User({
            firstName, lastName, emailId, password: passwordHash
        })
        await user.save();
        res.send("user added successfully!")
    } catch (error) {
        res.status(401).send("Something went wrong : " + error.message)
    }

})

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        validateEmailId(emailId)
        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("Please Enter correct EmailId")
        } else if (!await user.isPasswordValid(password)) {
            throw new Error("Enter correct Password")
        } else {
            //create JWT
            const token = user.getJWT();
            res.cookie("token", token , { expires: new Date(Date.now() + 1 * 3600000) })
            res.send("Login Successfully!")
        }
    } catch (error) {
        res.status(401).send("Something went wrong : " + error.message)
    }

})

authRouter.post("/logout" , (req,res) => {
    try {
        res.cookie("token" , "" , {expires : new Date(0)})
        res.send("Logout Successfully!")
    } catch (error) {
        res.status(401).send("Something went wrong : " + error.message)
    }
})

module.exports = authRouter