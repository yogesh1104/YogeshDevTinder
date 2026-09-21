// yogeshgupta8982_db_user
// AGPM63accgJHVNgU
// mongodb+srv://yogeshgupta8982_db_user:AGPM63accgJHVNgU@namastenode.znug9gl.mongodb.net/

const mongoose = require("mongoose");


const connectDb = async () => {
    await mongoose.connect("mongodb+srv://yogeshgupta8982_db_user:AGPM63accgJHVNgU@namastenode.znug9gl.mongodb.net/devTinder")

}

module.exports = {
    connectDb
}

