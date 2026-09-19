const express = require("express");

const app = express();

// app.use("/test/2" , (req , res) => {
//     res.send("Hello Test 2")
// })

// app.use("/hello" , (req , res) => {
//     res.send("Hello Hello")
// })
//Work as wild card order is important
// app.use("/" , (req , res) => {
//     res.send("Dashboard")
// })



app.use("/test", (req, res) => {
    res.send("Hello Test")
})

//order matter if at last then get post delete call happen but it at start then handle all HTTP methods calls
app.use("/user" , (req,res) => {
    res.send("use method")
})
app.get("/user" , (req,res) => {
    res.send("get call")
})
app.post("/user" , (req,res) => {
    res.send("post call")
})
app.delete("/user" , (req,res) => {
    res.send("delete call")
})


app.listen(7000, () => {
    console.log("Server started successfully")
});