const express = require("express");

const app = express();

app.use("/user" , [(req,res,next) => {
    //Route Handler
    console.log("1st Route Handler for route user")
    next();
    // res.send("1st Route Handler for route user");
},(req,res,next) => {
    console.log("2nd Route Handler for route user")
    res.send("2nd Route Handler for route user");
    next();
}],(req,res,next) => {
    console.log("3rd Route Handler for route user")
    // res.send("3rd Route Handler for route user");
    // next();
},(req,res,next) => {
    console.log("4th Route Handler for route user")
    // res.send("4th Route Handler for route user");
    // next();
})


app.listen(7000, () => {
    console.log("Server started successfully")
});