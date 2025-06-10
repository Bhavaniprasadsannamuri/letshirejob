const ErrorResponse = require("../middleware/error")
const mongoose = require("mongoose");
const JobType = require("../models/jobType")
const { ObjectId } = require("mongoose").Types;
const Job = require("../models/JobModel")

exports.createJobType = async (req, res, next) => {
  console.log("in jobtype")
  try {
    const JobT = await JobType.create({
      jobTypeName: req.body.jobTypeName,
      user: req.user.id
    });
    res.status(201).json({ success: true, JobT });



  }
  catch (err) {
    next(err);
  }
}
exports.showJobTypes = async (req, res, next) => {
  try {
    const fetchJobTypes = await JobType.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, fetchJobTypes });
  }
  catch (err) {
    next(err);
  }
}

exports.createJob = async (req, res, next) => {
  try {
    const JobT = await Job.create({
      jobTitle: req.body.jobTitle,
      salary: req.body.salary,
      description: req.body.description,
      location: req.body.location,
      available: req.body.available,
      user: req.user.id,
      jobType: req.body.jobType
    });
    res.status(201).json({ success: true, JobT });



  }
  catch (err) {
    next(err);
  }

}
exports.updateJob = async (req, res, next) => {
  try {
    const JobT = await Job.findOneAndUpdate(req.params.id, req.body, { new: true }).populate("jobType", "jobTypeName").populate("user", "firstName lastName");
    res.status(201).json({ success: true, JobT });
  }
  catch (err) {
    next(err);
  }

}

exports.deleteJob = async (req, res, next) => {
  try {
    const JobT = await Job.findByIdAndDelete(req.params.id);
    res.status(201).json({ success: true, JobT });
  }
  catch (err) {
    next(err);
  }

}
exports.findJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate("jobType", "jobTypeName").populate("user", "firstName lastName");
    //    console.log(job);
    // job = job.toObject();
    if (job.user) {
      job.jobType = job.jobType.jobTypeName;
    };
    console.log("type", job.jobType);
    //   job.user = `${job.user.firstName} ${job.user.lastName}`;  // Combine the first and last name into a single string
    // }
    res.status(200).json({ success: true, job });
  }
  catch (err) {
    next(err);
  }

}
exports.showJobs = async (req, res, next) => {
  console.log("keyword", req.query.keyword);
  const keyword = req.query.keyword ? {
    jobTitle: {
      $regex: req.query.keyword,
      $options: "i"
    }
  } : {};
  const pageSize = 2;
  const pageNumber = Number(req.query.pageNumber) || 1;

  //  filter by category 

  const jobtypes = await JobType.find({}, { _id: 1 })
  const jobtypesids = jobtypes.map((jobtype) => jobtype._id);
  console.log("jobtypes", jobtypesids);
  const filterjobType = req.query.category ? req.query.category : jobtypesids;
  console.log("filterjobType", filterjobType);
  // filter by location
  const jobsByLocation = await Job.find({}, { location: 1 })
  const locations = jobsByLocation.map((job) => job.location);
  const uniqueLocations = [...new Set(locations)];
  console.log("uniqueLocations", uniqueLocations);
  const filterLocation = req.query.location ? req.query.location : uniqueLocations;
  console.log("filterLocation", filterLocation);

  // estimate rows
  const count = await Job.find({ ...keyword, jobType: filterjobType, location: filterLocation }).countDocuments();
  try {
    const jobs = await Job.find({ ...keyword, jobType: filterjobType, location: filterLocation }).sort({ createdAt: -1 }).skip(pageSize * (pageNumber - 1)).limit(pageSize);;
    res.status(201).json({ locations: filterLocation, success: true, jobs, pageNumber, count, totalPages: Math.ceil(count / pageSize), jobtypesids, });
  }
  catch (err) {
    next(err);
  }

}