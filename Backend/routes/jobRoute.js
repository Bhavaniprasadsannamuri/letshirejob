const express = require("express")
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const { createJobType, createJob, updateJob, findJob, showJobs, showJobTypes } = require("../controllers/jobController");

router.post("/createJobType", isAuthenticated, isAdmin, createJobType);
router.post("/createJob", isAuthenticated, isAdmin, createJob);
router.put("/updateJob/:id", isAuthenticated, isAdmin, updateJob);
router.get("/findJob/:id", findJob);
router.get("/showJobs", showJobs);
router.get("/showJobsTypes", showJobTypes);
module.exports = router;