const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');
const mongoose = require('mongoose');
exports.allUsers = async (req, res, next) => {
  const pagesize = 10;
  const page = Number(req.query.parameter) || 1;
  const pageSize = 10;
  const pageNummber = (req.query.pageNumber) || 1;
  const count = await User.find({}).estimatedDocumentCount();
  // console.log("alluser", allUsers);
  try {
    const users = await User.find().sort({ createdAt: -1 }).select('-password')
      .skip((pageNummber - 1) * pagesize).limit(pageSize);
    res.status(200).json({
      succes: true,
      users,
      pageNummber,
      pages: Math.ceil(count / pageSize), count
    })

  }
  catch (err) {
    return next(err);
  }

}
exports.singleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    console.log("singleuser", user)
    res.status(200).json({ success: true, user });


  }
  catch (err) {
    return next(err);
  }
}
exports.editUser = async (req, res, next) => {
  console.log("edituser")

  try {
    const userEdited = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log("editeduser", userEdited);
    res.status(200).json({ success: true, userEdited });
  }
  catch (err) {
    return next(err);
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const userEdited = await User.findByIdAndDelete(req.params.id);
    console.log("editeduser", userEdited);
    res.status(200).json({ success: true, userEdited });
  }
  catch (err) {
    return next(err);
  }
}
exports.jobHistoryCreate = async (req, res, next) => {
  const { title, description, salary, location, applyjobId } = req.body;
  console.log("length", applyjobId.length);
  const currentUser = req.user;
  try {
    console.log(req.user instanceof mongoose.Model);
    const applyJob = { title, description, salary, location, user: currentUser._id, jobId: applyjobId };
    console.log("currentUser", currentUser);
    currentUser.jobHistory.push(applyJob);
    await currentUser.save();
    res.status(200).json({
      message: "Job added to history successfully",
      jobHistory: currentUser.jobHistory
    });
  }
  catch (err) {
    console.log("err", err);
    next(err);

  }

}