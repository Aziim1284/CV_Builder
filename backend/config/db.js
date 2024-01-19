const mongoose=require('mongoose')
const db="mongodb://localhost:27017/CVBuilder";
const connectDB=async()=>{
    try{
        await mongoose.connect(db,{useNewUrlParser:true});
        console.log("DB connected")
    }
    catch(err){
        console.log(err.message)
    }
}
module.exports=connectDB;