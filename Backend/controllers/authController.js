const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');

exports.signup = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new ErrorResponse("Email is required", 400));
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(new ErrorResponse("email already exists", 409));
  }
  try {
    const createuser = await User.create(req.body);
    res.status(201).json({
      success: true,
      singupstatus: true,
      createuser

    })
  }
  catch (err) {
    console.log(err.name);
    console.log(err.message);
    next(err);
  }
}


exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return next(new ErrorResponse("Email is required", 400));
  }


  try {
    const userExist = await User.findOne({ email }).select('+password');
    console.log(userExist);
    if (!userExist) {
      return next(new ErrorResponse("Invalid login credentials", 401));
    }
    const isPswMatched = await userExist.comparePassword(password);
    if (!isPswMatched) {
      return next(new ErrorResponse("invalid login credentials", 401));
    }
    // userExist.password = undefined;
    const token = createToken(userExist, 200, res);
  }
  catch (err) {
  }
}
const createToken = async (userExist, statuscode, res) => {
  const token = await userExist.getToken();
  res.status(statuscode).cookie("token", token, {
    maxAge: 50 * 50 * 1000,
    httpOnly: true,
    sameSite: "Lax",     // Allows cookies on top-level navigation
    secure: false
  }).json({ success: true, message: "login succesfull", role: userExist.role });
}
exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ succes: true, message: "logout succesfull" });
}
exports.userProfile = async (req, res, next) => {
  const user = await User.findById(req.user._id).select('-password');

  res.status(200).json({ success: true, user });

}
