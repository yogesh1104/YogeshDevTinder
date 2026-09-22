const express = require("express");
const { connectDb } = require("./config/database");
const app = express();
const cookieParser = require('cookie-parser')
app.use(express.json())
app.use(cookieParser())

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")
app.use("/" , authRouter)
app.use("/" , profileRouter)
app.use("/" , requestRouter)


connectDb().then(() => {
    console.log("Database connection established!")
    app.listen(7000, () => {
        console.log("Server started successfully")
    });
}).catch(() => {
    console.log("Databasse connection not established!")
})
















//user k schema se match hoga tabhi data enter hoga


//login api






// app.get("/user", async (req, res) => {
//     const userEmail = req.body.emailId
//     try {
//         const user = await User.find({ emailId: userEmail })
//         if (user.length == 0) {
//             res.status(404).send("user not found")
//         } else {
//             res.send(user)
//         }
//     } catch (error) {
//         res.status(500).send("Something went wrong" + error.message)
//     }
// })

// //feed api to get all the users
// app.get("/feed", async (req, res) => {
//     try {
//         const users = await User.find({})
//         if (users.length == 0) {
//             res.status(404).send("user not found")
//         } else {
//             res.send(users)
//         }
//     } catch (error) {
//         res.status(500).send("Something went wrong" + error.message)
//     }
// })

// //Delete user using id and email
// app.delete("/user", async (req, res) => {
//     // const userId = req.body.userId;;
//     const emailId = req.body.emailId;
//     try {
//         // const user = await User.findByIdAndDelete({_id : userId})
//         // const user = await User.findByIdAndDelete(userId)
//         const user = await User.findOneAndDelete({ emailId: emailId })
//         res.send("user deleted successfully")
//         console.log("deleted User => ", user)
//     } catch (error) {
//         res.status(500).send("Something went wrong" + error.message)
//     }
// })

// //update the user using id
// app.patch("/user/:userId", async (req, res) => {
//     // const userId = req.body.userId
//     // const inputEmail = req.body.inputEmailId
//     const userId = req.params?.userId
//     const data = req.body
//     //userId will not added in database bcoz userId is not in user schema
//     try {

//         const ALLOWED_UPDATES = ["age", "gender", "skills", "photoUrl"];
//         const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k))
//         if (!isUpdateAllowed) {
//             throw new Error("Update not Allowed")
//         }
//         if (req.body.skills.length > 10) {
//             throw new Error("Skill not more then 10")
//         }
//         // const user = await User.findOneAndUpdate({emailId : inputEmail} , data , {
//         //     returnDocument : 'before',
//         //     runValidators : true
//         // })
//         const user = await User.findOneAndUpdate({ _id: userId }, data, {
//             returnDocument: 'before', // you can use after also
//             runValidators: true
//         })
//         res.send("user updated successfully")
//         console.log("Before updated data => ", user)
//     } catch (error) {
//         res.status(500).send("Something went wrong " + error.message)
//     }
// })

