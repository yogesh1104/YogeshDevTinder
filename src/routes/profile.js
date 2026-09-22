const express = require("express")

const profileRouter = express.Router()
const {userAuth} = require("../middlewares/auth")
const { validationOfEditData } = require("../utils/validation")

profileRouter.get("/profile/view",userAuth , async (req, res) => {
    try {
        const user = req.user
        res.send(user)
    } catch (error) {
        res.status(401).send("Something went wrong : " + error.message)
    }
})


profileRouter.patch("/profile/edit",userAuth , async (req, res) => {
    try {
        validationOfEditData(req);
        const loggedInUser = req.user;
        Object.keys(req.body).forEach(field => loggedInUser[field] = req.body[field])
        await loggedInUser.save()
        // res.send("Profile update successfully")
        res.json({
            message : `${loggedInUser.firstName} profile is updated successfully`,
            data : loggedInUser
        })
    } catch (error) {
        res.status(401).send("Something went wrong : " + error.message)
    }
})

module.exports = profileRouter