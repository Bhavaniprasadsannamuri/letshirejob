const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');


exports.isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("token", token);
  console.log("in autneticated function", token);
  if (!token) {
    return next(new ErrorResponse("not Authorised to access this route due to no token", 401));
  }
  try {
    console.log("in autneticated function");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("in autneticated function");
    console.log("decoded", decoded);
    req.user = await User.findById(decoded.id);
    console.log("userfind", req.user);
    if (!req.user) {
      return next(new ErrorResponse("User not found", 404));
    }
    next();
  }
  catch (err) {
    return next(new ErrorResponse("not authroised to access this role", 401));

  }
}
exports.isAdmin = (req, res, next) => {
  console.log(req.user.role);
  if (req.user.role === 1) {
    return next(new ErrorResponse("Access denied you must be a admin", 401));
  }
  next();

}