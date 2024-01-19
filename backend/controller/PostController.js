const userData = require("../Modals/UserSchema");
const googleUser = require("../Modals/GoogleSchema")
const CVData = require("../Modals/CVSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecretKey = "*mohdAziimbhatti@#12#";
const { check, validationResult } = require('express-validator');
const stripe_key = require("stripe")("pk_test_51OPNQKSIcr1N6nUkOB7TMTX6nj9nUI1bKxcZLufFePjJZlrAhKPk4Wyd50PytpRcF4aaBWExReWcLb4wkf9AxrqG00sjvpiTu4")
async function postUser(req, res) {
  console.log(req.body);
  let ins = new userData({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
    cpassword: req.body.cpassword,
    photo: req.body.photo,
  });
  ins.save((err) => {
    if (err) res.json({ err: 1, message: "user already exist" });
    else {
      res.json({ err: 0, message: "User Registered Successfully" });
    }
  });
}
async function getAll(req, res) {
  userData.find({}, (err, data) => {
    console.clear()
    console.log('dataa' , data)
    if (err) throw err;
    res.send(data);
  });
}

async function getUser(req, res) {
  userData.findOne({ email: req.body.email }, (err, data) => {
    if (err) {
      res.send("its error");
    } else if (data == null) {
      res.json({ err: 1, message: "please write correct email id" });
    } else if (bcrypt.compareSync(req.body.password, data.password)) {
      let payload = {
        uid: req.body.email,
        fname: data.fname,
        lname: data.lname,
        password: data.password,
        photo: data.photo,
        id: data._id,
      };
      const token = jwt.sign(payload, jwtSecretKey, { expiresIn: 360000 });
      console.log({
        err: 0,
        success: true,
        status_code: 200,
        message: `" ${data.fname} You have logged In"`,
        data: data,
        token: token,
      });
      res.json({
        err: 0,
        success: true,
        status_code: 200,
        message: ` Hey ! ${data.fname} You have Logged In Successfully`,
        data: data,
        token: token,
        photo: data.photo,
      });
    } else if (!bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ err: 1, message: "Please Enter Valid Details" });
    }
  });
}

async function postCV(req, res) {
  // check('name').notEmpty().withMessage('Name is required'),
  // check('email').isEmail().withMessage('Invalid email address'),
  // check('experience').isInt({ min: 0 }).withMessage('Experience should be a positive integer'),
  console.log(req.body);

  let ins = new CVData(req.body);
  console.log("insss" ,ins)
  ins.save((err) => {
    if (err) res.json({ err: 1, message: "error occured" });
    else {
      console.log("data saved");
      res.json({ err: 0, message: "Your CV Has been saved successfully" });
    }
  });
}
async function getCV(req, res) {
  CVData.find({}, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
}
async function UpdateBasicDetails(req, res) {
  console.log(req.body);
  CVData.updateOne(
    { cv_id: req.body.cv_id },
    {
      $set: {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
        cv_id: req.body.cv_id,
      },
    },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          err: 0,
          success: true,
          status_code: 200,
          message: ` Hey ! Your Data Has Been Updated Successfully`,
          data: data,
        });
        console.log({
          err: 0,
          success: true,
          status_code: 200,
          message: ` Hey ! Your Data Has Been Updated Successfully`,
          data: data,
        });
      }
    }
  );
}
async function UpdateEducation(req, res) {
  console.log(req.body);
  CVData.updateOne(
    { cv_id: req.body.cv_id, "education.edu_id": req.body.edu_id },
    { "education.$": req.body },
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({
          err: 1,
          message: "Education Details Not Found!!",
        });
      } else {
        console.log(result);
        res.json({
          err: 0,
          message: "You Have Successfuly Set Your Education Details.",
        });
      }
    }
  );
}
async function UpdateExperience(req, res) {
  console.log(req.body);
  CVData.updateOne({ cv_id: req.body.cv_id, "experience.exp_id": req.body.exp_id },
   { "experience.$": req.body }, (err, result) => {
      if (err) {
        console.log(err);
        res.json({
          err: 1,
          message: "Experience Details Not Found!!",
        });
      } else {
        console.log(result);
        res.json({
          err: 0,
          message: "You Have Successfuly Set Your experience Details.",
        });
      }
    }
  );
}
async function UpdateProject(req, res) {
  console.log(req.body);
  CVData.updateOne(
    { cv_id: req.body.cv_id, "project.pro_id": req.body.pro_id },
    { "project.$": req.body },
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({
          err: 1,
          message: "project Details Not Found!!",
        });
      } else {
        console.log(result);
        res.json({
          err: 0,
          message: "You Have Successfuly Set Your project Details.",
        });
      }
    }
  );
}

async function UpdateSkill(req, res) {
  console.log(req.body);
  CVData.updateOne(
    { cv_id: req.body.cv_id },
    {
      $set: {
        skill: req.body.skill,
        perfection: req.body.perfection,
        cv_id: req.body.cv_id,
      },
    },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          err: 0,
          success: true,
          status_code: 200,
          message: ` Hey ! Your Skill Data Has Been Updated Successfully`,
          data: data,
        });
        console.log({
          err: 0,
          success: true,
          status_code: 200,
          message: ` Hey ! Your Skill Data Has Been Updated Successfully`,
          data: data,
        });
      }
    }
  );
}
async function UpdateSocialProfile(req, res) {
  console.log(req.body);
  CVData.updateOne(
    { cv_id: req.body.cv_id, "profile.social_id": req.body.social_id },
    { "profile.$": req.body },
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({
          err: 1,
          message: "profile Details Not Found!!",
        });
      } else {
        console.log(result);
        res.json({
          err: 0,
          message: "You Have Successfuly Set Your profile Details.",
        });
      }
    }
  );
}

async function PaymentRazorPay(req, res) {
  let status, error;
  const { token, amount } = req.body;
  console.log("reqbodyoayment" ,req.body)
  try {
    const charge = await stripe_key.charges.create({
      source: token.id,
      amount:amount,
      currency: 'usd',
    });
    console.clear()
    console.log("chargeeeeeeeeeeeeeeeeee" ,charge)
    status = 'success';
  } catch (error) {
    console.log(error);
    status = 'Failure';
  }
  res.json({ error, status });

}

 async function googleAuth (req, res) {
  try {
    const { name, email, googleId, userProfileImageUrl } = req.body;

    // Check if the user already exists
    let user = await googleUser.findOne({ googleId });

    if (!user) {
      // If the user doesn't exist, create a new user
      user = await googleUser.create({ name, email, googleId, userProfileImageUrl });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, jwtSecretKey);
    console.log("tokenningoogle" , token)
    // Send the token and user data back to the client
    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
 }
 async function googleAuthLogin(req, res) {
  try {
    const { googleId } = req.body;
   console.log("reqgoogleid" ,req.body)
    // Check if the user exists in the Google users collection
    const user = await googleUser.findOne({ googleId });
    
    if (!user) {
      return res.status(404).json({ err: 1, message: 'User not found. Please sign up.' });
    }


    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, jwtSecretKey);

    // Send the token and user data back to the client
    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
async function getgoogleuser(req, res) {
  googleUser.find({}, (err, data) => {
    console.clear()
    console.log('dataa' , data)
    if (err) throw err;
    res.send(data);
  });
}

 async function DeleteCv (req, res){
  const postId = req.params.id;
  console.log("postId" , req)
  try {
    const post = await CVData.findById(postId);
    console.log("postsss" ,post)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    await CVData.findByIdAndDelete(postId);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  postUser,
  getAll,
  getUser,
  postCV,
  getCV,
  UpdateBasicDetails,
  UpdateEducation,
  UpdateExperience,
  UpdateProject,
  UpdateSocialProfile,
  UpdateSkill,
  PaymentRazorPay,
  googleAuth,
  googleAuthLogin,
  getgoogleuser,
  DeleteCv
};
