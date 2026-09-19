const express = require("express");

const app = express();

app.get("/user/:user" , (req,res) => {
    console.log(req.params);
    res.send("get call")
})
app.get("/user" , (req,res) => {
    console.log(req.query)
    res.send("get call 2")
})
app.get("/ab{*any}c" , (req,res) => {
    res.send("get call ?")
})

app.get(/^\/qw+e$/ , (req,res) => {
    res.send("get call +")
})

app.get(/.*fly$/ , (req,res) => {
    res.send("get call regx")
})



app.listen(7000, () => {
    console.log("Server started successfully")
});