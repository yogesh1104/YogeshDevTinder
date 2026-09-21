const express = require("express");
const { connectDb } = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json())

//user k schema se match hoga tabhi data enter hoga
app.post("/signup", async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save();
        res.send("user added successfully!")
    } catch (error) {
        res.status(401).send("Something went wrong : " + error.message)
    }

})

app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId
    try {
        const user = await User.find({ emailId: userEmail })
        if (user.length == 0) {
            res.status(404).send("user not found")
        } else {
            res.send(user)
        }
    } catch (error) {
        res.status(500).send("Something went wrong"+ error.message)
    }
})

//feed api to get all the users
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({})
        if (users.length == 0) {
            res.status(404).send("user not found")
        } else {
            res.send(users)
        }
    } catch (error) {
        res.status(500).send("Something went wrong"+ error.message)
    }
})

//Delete user using id and email
app.delete("/user" , async (req,res) => {
    // const userId = req.body.userId;;
    const emailId = req.body.emailId;
    try {
        // const user = await User.findByIdAndDelete({_id : userId})
        // const user = await User.findByIdAndDelete(userId)
        const user = await User.findOneAndDelete({emailId : emailId})
        res.send("user deleted successfully")
        console.log("deleted User => " , user)
    } catch (error) {
        res.status(500).send("Something went wrong"+ error.message)
    }
})

//update the user using id
app.patch("/user" , async (req,res) => {
    // const userId = req.body.userId
    const inputEmail = req.body.inputEmailId
    const data = req.body
    //userId will not added in database bcoz userId is not in user schema
    try {
        // const user = await User.findOneAndUpdate({_id : userId} , data , {
        //     returnDocument : 'before' // you can use after also
        // })
        const user = await User.findOneAndUpdate({emailId : inputEmail} , data , {
            returnDocument : 'before',
            runValidators : true
        })
        res.send("user updated successfully")
        console.log("Before updated data => " , user)
    } catch (error) {
        res.status(500).send("Something went wrong"+ error.message)
    }
})

connectDb().then(() => {
    console.log("Database connection established!")
    app.listen(7000, () => {
        console.log("Server started successfully")
    });
}).catch(() => {
    console.log("Databasse connection not established!")
})

