const express = require("express");

const {auth , user} = require("./middlewares/auth")
const app = express();


app.get("/admin" , auth)

app.get("/user" , user , (req,res) => {
    res.send("user passed middleware")
})

app.get("/admin/getStatus" , (req,res,next) => {
    res.send("admin Authorized")
},(req,res,next) => {
    res.send("admin auth")
})


app.listen(7000, () => {
    console.log("Server started successfully")
});