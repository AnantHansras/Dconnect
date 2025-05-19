
const express = require('express');
const app = express();

const dotenv = require('dotenv')
dotenv.config();

const dbConnect = require('./Config/db')
dbConnect();

const cors = require('cors')
const cookieParser = require("cookie-parser");

const session = require('express-session');

app.use(session({
  secret: process.env.JWT_SECRET,  // A secret key for session encryption
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Change to true if you're using HTTPS
}));


app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"*",
		credentials:true,
	})
)

const {cloudinaryConnect } = require("./Config/cloudinary");
cloudinaryConnect();


const jobSeekerRoutes = require('./Routes/jobseeker')
const companyauth = require('./Routes/companyauth')
const jobSeekerAuth = require('./Routes/jobseekerauth')
app.use('/jobseeker',jobSeekerRoutes)
app.use('/companyauth',companyauth)
app.use('/auth',jobSeekerAuth)


app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server of Dconnect is running....'
	});
});

const port = process.env.PORT || 8000;
app.listen(port,console.log("Server is running on port ",port));
