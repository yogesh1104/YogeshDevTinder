const jwt = require("jsonwebtoken")
const User = require("../models/user")
const userAuth = async (req,res,next) => {
    const {token} = req.cookies;
    if(!token){
        throw new Error("Token is Invalid!!!!!")
    }

    const decodedObj = jwt.verify(token , "Dev@Tinder")
    const {_id} = decodedObj;
    const user = await User.findById(_id);
    if(!user){
        throw new Error("User not found!!!")
    }
    req.user = user;
    next();
}

module.exports = {
    userAuth
}