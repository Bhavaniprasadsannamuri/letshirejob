// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectId } = mongoose.Schema;

const JobHistorySchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    trim: true,
    maxLength: 70
  },
  salary: {
    type: String,
    trim: true,

  },
  description: {
    type: String,
    trim: true
  },
  location: {
    type: String
  },
  interviewDate: {
    type: Date
  },
  applicationStatus: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  },
  jobId: {
    type: ObjectId,
    ref: "Job"

  },
  user: {
    type: ObjectId,
    ref: "User",
    required: true
  }
},
  { timestamps: true });

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please enter your firstname'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Please enter your lastname'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [7, "length should be minimum 7"],
    select: false
    // don't return password by default
  },
  jobHistory: [JobHistorySchema],
  role: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });


UserSchema.pre("save", async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);

})
UserSchema.methods.comparePassword = async function (enterPassword) {
  const result = await bcrypt.compare(enterPassword, this.password);
  console.log("comparePassword", result);
  return result;
}
UserSchema.methods.getToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: 3600 });
}
module.exports = mongoose.model("User", UserSchema);
