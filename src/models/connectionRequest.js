const mongoose = require("mongoose");
const User = require("./user")

const connectionRequestSchema = mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : User,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : User,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: '{VALUE} is invalid status'
        }
    }
}, { timestamps: true })

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 })

connectionRequestSchema.pre("save", function () {
    const connectionRequest = this
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Don't send connection request to yourself");
    }
})

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema)