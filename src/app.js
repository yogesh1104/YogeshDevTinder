const express = require("express");
const { connectDb } = require("./config/database");
const User = require("./models/user");
const app = express();
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
app.use(express.json())
app.use(cookieParser())
const { validatoSignUpData, validateEmailId } = require("./utils/validation")
const jwt = require("jsonwebtoken")
const {userAuth} = require("./middlewares/auth")
//user k schema se match hoga tabhi data enter hoga
app.post("/signup", async (req, res) => {

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

//login api

app.post("/login", async (req, res) => {
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

app.get("/profile",userAuth , async (req, res) => {
    try {
        const user = req.user
        res.send(user)
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
        res.status(500).send("Something went wrong" + error.message)
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
        res.status(500).send("Something went wrong" + error.message)
    }
})

//Delete user using id and email
app.delete("/user", async (req, res) => {
    // const userId = req.body.userId;;
    const emailId = req.body.emailId;
    try {
        // const user = await User.findByIdAndDelete({_id : userId})
        // const user = await User.findByIdAndDelete(userId)
        const user = await User.findOneAndDelete({ emailId: emailId })
        res.send("user deleted successfully")
        console.log("deleted User => ", user)
    } catch (error) {
        res.status(500).send("Something went wrong" + error.message)
    }
})

//update the user using id
app.patch("/user/:userId", async (req, res) => {
    // const userId = req.body.userId
    // const inputEmail = req.body.inputEmailId
    const userId = req.params?.userId
    const data = req.body
    //userId will not added in database bcoz userId is not in user schema
    try {

        const ALLOWED_UPDATES = ["age", "gender", "skills", "photoUrl"];
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k))
        if (!isUpdateAllowed) {
            throw new Error("Update not Allowed")
        }
        if (req.body.skills.length > 10) {
            throw new Error("Skill not more then 10")
        }
        // const user = await User.findOneAndUpdate({emailId : inputEmail} , data , {
        //     returnDocument : 'before',
        //     runValidators : true
        // })
        const user = await User.findOneAndUpdate({ _id: userId }, data, {
            returnDocument: 'before', // you can use after also
            runValidators: true
        })
        res.send("user updated successfully")
        console.log("Before updated data => ", user)
    } catch (error) {
        res.status(500).send("Something went wrong " + error.message)
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

