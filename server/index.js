
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
    origin: ["http://localhost:5173/", "https://dconnect-eight.vercel.app/"],
    credentials: true,
  })
);

const {cloudinaryConnect } = require("./Config/cloudinary");
cloudinaryConnect();


const jobSeekerRoutes = require('./Routes/jobseeker')
const companyauth = require('./Routes/companyauth')
const jobSeekerAuth = require('./Routes/jobseekerauth')
const jobRoutes = require('./Routes/job')
const connectionRoutes = require('./Routes/connections')

app.use('/jobseeker',jobSeekerRoutes)
app.use('/companyauth',companyauth)
app.use('/auth',jobSeekerAuth)
app.use('/api/v1',jobRoutes)
app.use('/connection',connectionRoutes)

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server of Dconnect is running....'
	});
});

const port = process.env.PORT || 8000;
app.listen(port,console.log("Server is running on port ",port));
