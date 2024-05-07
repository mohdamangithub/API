const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchErrors } = require("./catchErrors");

exports.isAuthenticated = catchErrors(async (req, res, next) => {
  const { Token } = req.cookies;
  if (!Token) {
    return next(
      new ErrorHandler("Please login in to access the resource", 401)
    );
  }
  const { user } = jwt.verify(Token, "JWT_TOKEN");
  req.user = user.email;
  next();
});
