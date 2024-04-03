const mongoose=require("mongoose")
async function dbConnect(){
    DBURL="mongodb+srv://mernet:ansuman@cluster0.urbgxyt.mongodb.net"
    DBNAME="expense_tracker"
    try{
        await mongoose.connect(DBURL+"/"+DBNAME)
        console.log("Database Connected");
    }
    catch(error){
        console.log("Connection error"+error);
    }
}
module.exports=dbConnect;
