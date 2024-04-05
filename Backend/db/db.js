const mongoose = require("mongoose")
async function dbConnect(){
    const DB_URL = process.env.DBURL
    const DB = process.env.DBNAME
    try{
        await mongoose.connect(DB_URL + "/" + DB)
        console.log("Database Connected");
    }
    catch(error){
        console.log("Connection Error"+ error);
    }
}
module.exports = dbConnect