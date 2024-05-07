const { catchErrors } = require("../middlewares/catchErrors")
const User = require("../models/userSchema")
const ErrorHandler = require("../utils/ErrorHandler")
const { sendToken } = require("../utils/SendToken")
exports.test =catchErrors( (req, res, next)=>{
res.json({
    message: "Home Pageuuuuuuuuu"
})
})

exports.ProfilePage = catchErrors(async(req, res, next)=>{
const user = await User.findOne({email: req.user})
})

exports.createUser =catchErrors( async (req, res, next)=>{
        const newuser =  await new User(req.body).save();
        sendToken(newuser, 201, res);
        // res.status(201).json({
        //     message: "USER SUCCESSFULLY CREATED",
        //     newuser
        // })
})
exports.signIn =catchErrors( async (req, res, next)=>{
        const finduser =  await User.findOne({email: req.body.email}).select("+password")
        
        if(!finduser){
         return next(new ErrorHandler("User Not Found With This Email Address", 404))
        }

        const isMatch = finduser.comparepassword(req.body.password)
       if(!isMatch) return next(new ErrorHandler("Password is Incorrect", 401))

       sendToken(finduser, 200, res);
       
})
exports.signOut =catchErrors( async (req, res, next)=>{
     res.clearCookie("token");
     res.json({
        message: "Successfully Sign Out"
     })

})