const express = require("express");

const app = express();


app.use("/test" , (req , res) => {
    res.send("Hello Test")
})
app.use("/hello" , (req , res) => {
    res.send("Hello Hello")
})
app.use("/" , (req , res) => {
    res.send("Dashboard")
})

app.listen(7000 , () => {
    console.log("Server started successfully")
});