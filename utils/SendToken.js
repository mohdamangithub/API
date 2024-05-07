exports.sendToken = (user, statusCode, res)=>{
const Token = user.getJwtToken(user)
const options = {
    expire: new Date(
        Date.now() + 1 * 24 * 60 * 60 * 1000 
    ),
    httpOnly: true,
}
res.status(statusCode).cookie("Token", Token, options).json({
    success: true,
    user,
    Token,
})
}