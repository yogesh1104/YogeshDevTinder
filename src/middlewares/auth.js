const jwt = require("jsonwebtoken")
const User = require("../models/user")
const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Token is Invalid!!!!!")
        }

        const decodedObj = jwt.verify(token, "Dev@Tinder")
        const { _id } = decodedObj;
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found!!!")
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send("Something went wrong : " + error.message)
    }
}

module.exports = {
    userAuth
}