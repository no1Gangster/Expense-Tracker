const mongoose = require("mongoose")
async function dbConnect(){
    DBURL = "mongodb+srv://adyasha:12345@cluster0.ewxrfas.mongodb.net"
    DBNAME = "expense_tracker"
    try{
        await mongoose.connect(DBURL + "/" + DBNAME)
        console.log("Database Connected");
    }
    catch(error){
        console.log("Connection Error"+ error);
    }
}
module.exports = dbConnect