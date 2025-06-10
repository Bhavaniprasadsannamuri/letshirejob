const express = require("express")
const router = express.Router();
const { signup, signin, logout, userProfile } = require("../controllers/authController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const { allUsers, singleUser, editUser, deleteUser, jobHistoryCreate } = require("../controllers/usersController");
router.get("/allUsers", isAuthenticated, isAdmin, allUsers);
router.get("/singleUser/:id", isAuthenticated, singleUser);
router.post("/editUser/:id", isAuthenticated, editUser);
router.get("/deleteUser/:id", isAuthenticated, isAdmin, deleteUser);
router.post("/jobHistoryCreate", isAuthenticated, jobHistoryCreate);
module.exports = router;