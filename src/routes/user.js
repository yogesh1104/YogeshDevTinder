const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest")

const userRouter = express.Router();
const User = require("../models/user")
const USER_SAFE_DATA = "firstName lastName about age gender  photoUrl"

// get the all the pending request
userRouter.get("/user/request/receive" , userAuth , async (req , res) => {
    try {
        const loggedInUser = req.user
        const pendingRequest = await ConnectionRequest.find({
            toUserId : loggedInUser._id,
            status : "interested"
        }).populate("fromUserId" , USER_SAFE_DATA)
        if(pendingRequest.length === 0){
            return res.send("No pending request")
        }
        res.json({
            message : "data fetch successfully",
            data : pendingRequest
        })
    } catch (error) {
        res.status(400).send("ERROR " + error.message)
    }
})

// get the all the connection
userRouter.get("/user/connection" , userAuth , async (req , res) => {
    try {
        const loggedInUser = req.user
        const connectedUsers = await ConnectionRequest.find({
            $or: [
                {
                    fromUserId: loggedInUser._id,
                    status: "accepted"
                },
                {
                    toUserId: loggedInUser._id,
                    status: "accepted"
                }
            ]

        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA)
        if (connectedUsers.length === 0) {
            return res.send("No pending request")
        }

        const data = connectedUsers.map(row => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json({
            message: "data fetch successfully",
            data: data
        })
    } catch (error) {
        res.status(400).send("ERROR " + error.message)
    }
})

userRouter.get("/user/feed" , userAuth , async (req, res) => {
    try {
        const loggedInUser = req.user;
        let page = parseInt(req.query.page) || 1
        let limit = parseInt(req.query.limit) || 10
        limit = limit > 50 ? 50 : limit
        const skip = (page - 1) * limit
        const connectionRequested = await ConnectionRequest.find({
            $or : [
                {fromUserId : loggedInUser._id},
                {toUserId : loggedInUser._id}
            ]
        }).select("fromUserId toUserId")

        const hideUserForFeed = new Set()
        if(connectionRequested.length > 0){
            connectionRequested.forEach((req) => {
                hideUserForFeed.add(req.fromUserId.toString())
                hideUserForFeed.add(req.toUserId.toString())
            })
        }
        const user = await User.find({
            $and : [
                {_id : {$nin : Array.from(hideUserForFeed)}},
                {_id : {$ne : loggedInUser._id}}
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)
        res.send(user)
    } catch (error) {
        res.status(400).send("Error" + error.message)
    }
})

module.exports = userRouter