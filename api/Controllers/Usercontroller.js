import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import Userss from "../Models/UserSchema.js";
import mailer from "../../Utils/Nodemailer.js";


const CreateUsers = async (req, res) => {
  try {
    const { name, email, phone, password, cpassword } = req.body;


    if (password !== cpassword) {
      return res.status(400).json({
        status: "fail",
        message: "Password confirmation does not match",
      });
    }


    const existingUser = await Userss.findOne({ email: email, verifiedstatus: true });

    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "User already registered",
      });
    }

    if (password.length < 4) {
      return res.status(400).json({
        status: "fail",
        message: "Password must be greater than 4 characters",
      });
    }

    const sixDigitCode = Math.floor(100000 + Math.random() * 900000);


    try {

      await mailer({
        to:email,
        subject: 'Your code',
        text: `Here is your verification code ${sixDigitCode}`,
      });

    } catch (err) {

      console.log(err)

      return res.status(400)
        .json({
          status: "fail",
          message: "server down try later"
        })
    }


    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await Userss.create({
      name,
      email,
      phone,
      password: hashedPassword,
      verifycode: sixDigitCode,
      verifiedstatus: false,
    });

    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    console.log(err)

    return res.status(500).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
};

const verifyUsers = async (req, res) => {
  try {
    const { verifycode } = req.body;

    const user = await Userss.findOne({ verifycode: verifycode });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid verification code",
      });
    }

    user.verifiedstatus = true;
    user.verifycode = null;

    await user.save();

    return res.status(200).json({
      status: "success",
      data: "User registered successfully",
    });
  } catch (err) {
    console.error("Error in verifyUserss:", err);
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
};

const loginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Email and password are required",
      });
    }

    const user = await Userss.findOne({ email: email, verifiedstatus: true });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User not registered or not verified",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({id:user._id},process.env.jwt_key,{expiresIn:process.env.jwt_exp})


   




    return res.status(200).json({
      status: "success",
      data:user,
      token:token

    });
  } catch (err) {
    console.error("Error in loginUserss:", err);
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong, try later",
    });
  }
};


const forgotuser = async (req, res) => {
  try {
    const { email} = req.body;

    if (!email) {
      return res.status(400).json({
        status: "fail",
        message: "Email required",
      });
    }

    const user = await Userss.findOne({ email: email, verifiedstatus: true });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User not registered or not verified",
      });
    }

    const sixDigitCode = Math.floor(100000 + Math.random() * 900000);


        try {

      await mailer({
        to:email,
        subject: 'Your code',
        text: `Here is your forgotpassword code ${sixDigitCode}`,
      });

    } catch (err) {

      console.log(err)

      return res.status(400)
        .json({
          status: "fail",
          message: "server down try later"
        })
    }


     user.resetpasscode=sixDigitCode
     await user.save();



 return res.status(200).json({
      status:"success",
      data:"verify code sent successfully"
    })

  } catch (err) {
    console.error("Error in loginUserss:", err);
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong, try later",
    });
  }
};

const resetpassuser = async (req, res) => {
  try {
    const {resetpasscode,password,cpassword} = req.body;

    if (!resetpasscode) {
      return res.status(400).json({
        status: "fail",
        message: "Code required",
      });
    }

    const user = await Userss.findOne({ resetpasscode:resetpasscode, verifiedstatus: true });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "code is invalid",
      });
    }

    console.log(password);
    console.log(cpassword)

    if(!(password == cpassword)){

      return res.status(400).json({
        status:"fail",
        message:"password conform password not match"
      })
    }

    const hashpass = await bcrypt.hash(password,8)

     user.resetpasscode=null,
     user.password =hashpass,
     await user.save();



 return res.status(200).json({
      status:"success",
      data:"password changed successfully please login again"
    })

  } catch (err) {
    console.error("Error in loginUserss:", err);
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong, try later",
    });
  }
};


const editprofile = async (req, res) => {
  try {
    const id = req.id;

    const { name, phone } = req.body;

    const user = await Userss.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          phone,
        },
      },
      {
        new: true, 
        runValidators: true, 
      }
    );

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    console.error("Edit profile error:", err);
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong. Please try again later.",
    });
  }
};

const editpassword = async (req, res) => {
  try {
    const id = req.id; 

    const { oldpassword, password, cpassword } = req.body;

  
    if (!oldpassword || !password || !cpassword) {
      return res.status(400).json({
        status: 'fail',
        message: 'All fields are required: oldpassword, password, cpassword.',
      });
    }

    const user = await Userss.findById(id);
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found.',
      });
    }

    
    const isMatch = await bcrypt.compare(oldpassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: 'fail',
        message: 'Old password is incorrect.',
      });
    }

    
    if (password !== cpassword) {
      return res.status(400).json({
        status: 'fail',
        message: 'New password and confirm password do not match.',
      });
    }

    const isSamePassword = await bcrypt.compare(password, user.password);
    if (isSamePassword) {
      return res.status(400).json({
        status: 'fail',
        message: 'New password must be different from the old password.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      status: 'success',
      message: 'Password updated successfully.',
    });

  } catch (err) {
    console.error('Edit password error:', err);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went wrong. Please try again later.',
    });
  }
};

const verifyuser = async(req,res)=>{

  try{

    const id = req.id;

    const user = await Userss.findById(id);

    return res.status(200).json({
      status:"success",
      data:user
    })


  }catch(err){
    console.log(err)

    return res.status(500).json({
      status:"fail",
      message:"something went wrong try later"
    })
  }
}


export { CreateUsers, verifyUsers, loginUsers,forgotuser,resetpassuser,editprofile,editpassword,verifyuser};
