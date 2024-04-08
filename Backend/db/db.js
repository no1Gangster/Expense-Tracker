const mongoose=require("mongoose")
async function dbConnect(){
    const DBURL=process.env.DB_URL
    const DBNAME=process.env.DB_NAME
    try{
        await mongoose.connect(DBURL+"/"+DBNAME)
        console.log("Database Connected");
    }
    catch(error){
        console.log("Connection error"+error);
    }
}
module.exports=dbConnect;
