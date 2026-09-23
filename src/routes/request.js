const express = require("express");
const mongoose = require("mongoose")
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user")
const ConnectionRequest = require("../models/connectionRequest")
const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:userId" , userAuth , async (req,res) => {
    try {
        const allowedStatus = ["ignored" , "interested"];
        const status = req.params.status
        const toUserId = req.params.userId
        const fromUserId = req.user._id
        if (!allowedStatus.includes(status)) {
            throw new Error("Status is Invalid")
        }
        if (!mongoose.Types.ObjectId.isValid(toUserId)) {
            return res.status(400).json({ error: "Invalid User ID format." });
        }
        const toUser = await User.findById(toUserId)
        if(!toUser){
            return res.status(400).json({error : "Invalid UserId"})
        }
        const isExistingConnection = await ConnectionRequest.findOne({
            $or : [
                {fromUserId , toUserId},
                {fromUserId : toUserId , toUserId : fromUserId}
            ]
        })

        if(isExistingConnection){
            return res.status(400).json({message : "Existing Connection"})
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId , toUserId , status
        })
        await connectionRequest.save()
        res.send("connection sent successfully")
    } catch (error) {
        res.status(400).send("Something went wrong : " + error.message)
    }
})

requestRouter.post("/request/review/:status/:requestId" , userAuth ,async  (req,res) => {
    try {
        const {requestId} = req.params
        const {status} = req.params
        const allowedStatus = ["accepted" , "rejected"];
        if (!allowedStatus.includes(status)) {
            throw new Error("Status is Invalid")
        }
        if (!mongoose.Types.ObjectId.isValid(requestId)) {
            return res.status(400).json({ error: "Invalid requestId format." });
        }
        const connectionRequest = await ConnectionRequest.findOne({
            toUserId : req.user._id,
            status : "interested"
        })
        if(!connectionRequest){
            return res.status(400).json({message : "Invalid request"})
        }
        connectionRequest.status = status;
        await connectionRequest.save();;
        res.send("Connection " + status)

    } catch (error) {
        res.status(400).send("ERROR " + error.message)
    }
})

module.exports = requestRouter