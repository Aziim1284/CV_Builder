const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    fname:{
        type: String,
        required:true
     
    },
    lname:{
        type: String,
        required:true
     
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
      
    },
    cpassword:{
        type:String,
      
    },
    photo:{
        type:String,
        
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
module.exports=mongoose.model('User',UserSchema)