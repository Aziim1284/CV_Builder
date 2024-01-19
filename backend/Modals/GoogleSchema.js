const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
   
    email:{
        type:String,
        unique:true
    },
   
    name:{
        type:String,
    },
    googleId:{
        type:String,
    },
    userProfileImageUrl:{
        type:String
    }

})
module.exports=mongoose.model('Google',UserSchema)