
const express = require('express');
const indexRoute = require("./routes/indexRoutes");
const User = require("./models/userSchema")
const PORT = 3000;
const app = express();
const expressSession = require('express-session');
const cookieparser = require("cookie-parser")
 
//logger
const logger = require("morgan");
app.use(logger("tiny"))

//bodyParser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//express-session
app.use(expressSession({
    resave: true,
    saveUninitialized: true,
    secret: "Sarararara"
}))
app.use(cookieparser())


app.use("/", indexRoute);

//Error Handle
const ErrorHandler = require('./utils/ErrorHandler');
const { generatedErrors } = require('./middlewares/errors');
app.all("*", (req, res, next)=>{
next(new ErrorHandler(`Request URL Not Found ${req.url}`, 404))
})
app.use(generatedErrors)

app.listen(PORT, console.log(`Server Running in PORT Number ${PORT}`))