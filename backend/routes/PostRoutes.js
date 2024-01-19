const { check, validationResult } = require('express-validator');
const express=require('express')
const {postUser,getAll,getUser,postCV, getCV, UpdateBasicDetails, UpdateEducation, UpdateExperience, UpdateProject, UpdateSocialProfile, UpdateSkill ,PaymentRazorPay ,googleAuth ,googleAuthLogin ,DeleteCv}=require('../controller/PostController')
const router = express.Router()
const userData=require('../Modals/UserSchema')
const multer = require('multer')
const jwt = require('jsonwebtoken')
const jwtSecretKey = "*mohdAziimbhatti@#12#";

router.post('/adduser',postUser)
router.get('/getall' ,getAll)
router.post('/getuser' ,getUser)
router.post('/addcv'  ,postCV)
router.post('/getcv'  ,getCV)
router.post('/updatecv', UpdateBasicDetails)
router.post('/updateeducation', UpdateEducation)
router.post('/updateexperience' ,UpdateExperience)
router.post('/updateproject' ,UpdateProject)
router.post('/updateskill', UpdateSkill)
router.post('/updatesocialprofile', UpdateSocialProfile)
router.post('/payment' , PaymentRazorPay)
router.post('/googleauth' ,googleAuth)
router.delete('/posts/:postId',DeleteCv)


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Images/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  });
  

  const fileFilter=(req, file, cb)=>{
   if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png'){
       cb(null,true);
   }else{
       cb(null, false);
   }

  }


var upload = multer({ 
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter:fileFilter
 });

router.post("/updateprofilephoto",upload.single('photo'),function(req,res,next){
    console.log(req.body.uid)
    
   const url = req.protocol + '://' + req.get('host') + '/Images/' + req.file.filename;
//    req.body.image = url;

console.log(url)
   userData.updateOne({email:req.body.uid}, 
       { $set: { photo: url } }, function (err, docs,data) {
       if (err){
           console.log(err)
       }
       else{
       
           let payload = {
              id:req.body.id,
               uid:req.body.uid,
               fname:req.body.fname,
               lname:req.body.lname,
               password:req.body.password,
               photo:url
              }
              const token = jwt.sign(payload,jwtSecretKey,{expiresIn:360000})
              console.log({
               err: 0, 
               success: true,
               status_code: 200,
               message:` Hey ! Your Data Has Been Updated Successfully`,
               docs:docs,
               token:token
           })
               res.json({
                   err: 0, 
                   success: true,
                   status_code: 200,
                   message:` Hey ! Your Data Has Been Updated Successfully`,
                  data:data,
                   token:token
               })
         
        
       }
   });

});


module.exports=router;
