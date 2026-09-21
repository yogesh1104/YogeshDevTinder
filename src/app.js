const express = require("express");
const { connectDb } = require("./config/database");
const User = require("./models/user");
const app = express();

//user k schema se match hoga tabhi data enter hoga
app.post("/signup", async (req, res) => {
    const user = new User({
        firstName: "Yogesh",
        lastName: "Gupta",
        // email: "yogesh@gupta.com",  ye entere ni huaa kyu ki match nii huaa
        emailId: "yogesh@gupta.com",
        password: "Yogesh@123"
    })

    await user.save();
    res.send("user added successfully!")
})

connectDb().then(() => {
    console.log("Database connection established!")
    app.listen(7000, () => {
        console.log("Server started successfully")
    });
}).catch(() => {
    console.log("Databasse connection not established!")
})

