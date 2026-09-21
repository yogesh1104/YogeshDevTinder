const auth = (req,res,next) => {
    let authrized = "xyz";
    if(authrized === "xyz"){
        next()
    }else{
        res.status(401).send("user Unauthorized!")
    }
}
const user = (req,res,next) => {
    let authrized = "xyz";
    if(authrized === "xyzsa"){
        next()
    }else{
        res.status(401).send("user Unauthorized!")
    }
}

module.exports = {
    auth , user
}