const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
var cors = require("cors");
const errorHandler = require("./middleware/error")

const authroute = require("./routes/authroute");
const userroute = require("./routes/userRoutes")
const jobRoute = require("./routes/jobRoute")
const port = process.env.PORT || 9000;
// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


// routes
app.use("/auth", authroute);
app.use("/users", userroute);
app.use("/job", jobRoute)
app.use(errorHandler);
// database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log("databse connected"))
    .catch((err) => console.log("failed databse"));
app.listen(port, () => {
    console.log("backend running on server 8000");
})