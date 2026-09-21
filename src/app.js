const express = require("express");

const app = express();

//define at last so handle all type of errors
// app.use("/" , (err , req , res , next) => {
//     if(err){
//         res.status(500).send("middleware for handling error at top")
//     }
// })

app.get("/user" , (req,res,next) => {
    throw new Error("asd")
    res.send("Error handling")
})

app.get("/admin" , (req,res) => {
    try {
        throw new Error("admin error handle here")
        res.send("admin")
    } catch (error) {
        console.log("Error cought")
        res.send("handle Error using try catch")
    }
})
app.use("/" , (err , req , res , next) => {
    if(err){
        res.status(500).send("middleware for handling error at bottom")
    }
})

app.listen(7000, () => {
    console.log("Server started successfully")
});