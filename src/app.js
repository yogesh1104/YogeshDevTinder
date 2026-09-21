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
        res.status(401).send("Something went wrong")
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

