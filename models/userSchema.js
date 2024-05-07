const { Mongoose, default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
 
mongoose.connect('mongodb://127.0.0.1:27017/userAPI')
.then(function () {
console.log('Conneted to Mongodb');
})
.catch(function (err) {
console.log(err);
});
 
const userSchema = mongoose.Schema({
   email:{
      type: String,
      unique:true,
      required: [true, "Email Address is Required"],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
     },
   password: {
    type: String,
    select: false,
    required: [true, "Password is Required"],
    minLength: [6, "Password should have atleat 6 characters"],
    maxLength: [15, "Password should not exceed more than 15 characters"],
    match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/, "Password require atleast 1 characher(upper/lower),number and symbol",
  ],
   },
 
   isAdmin: {
      type: Boolean,
      default: false,
    },
}, {timestamps: true});

//encrypt password
userSchema.pre("save", function(){
  if(!this.isModified("password")){
    return;
  }
  const salt = bcrypt.genSaltSync(10)
  this.password = bcrypt.hashSync(this.password, salt)
})
userSchema.methods.comparepassword = function(password){
return bcrypt.compareSync(password, this.password)
}
userSchema.methods.getJwtToken = function(user){
return jwt.sign({user}, "JWT_TOKEN", {expiresIn: "1h"})
}


module.exports = mongoose.model("user", userSchema)