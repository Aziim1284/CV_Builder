const mongoose=require('mongoose')
const cvSchema = new mongoose.Schema({ 
    name:{
        type:String,
       
    },
    id:{
        type:String
    },
    email:{
        type:String,
        unique:true
       
    },
    address:{
        type:String,
       
    }, 
    phone:{
        type:String,
      
    },
    city:{
        type:String,
       
    },
    introduction:{
        type:String,
    },
    state:{
        type:String,
      
    }, 
     pincode:{
        type:String,
      
    },
    skill:{
        type:String,
      
    },
    perfection:{
        type:String,
      
    },
    education:{
        type:Array,
      
    },
    experience:{
        type:Array,
      
    },
    project:{
        type:Array,
    },
    profile:{
        type:Array
    },
    cv_id:{
        type:String
    },
    photo:{
        type:String,
    }
})
module.exports=mongoose.model('CVData',cvSchema)