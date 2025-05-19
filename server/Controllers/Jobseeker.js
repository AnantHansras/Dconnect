const JobSeeker = require('../Models/JOB_SEEKER');

// Fetch JobSeeker(s)
exports.getJobSeekers = async (req, res) => {
  try {
    const jobSeekers = await JobSeeker.find();
    res.status(200).json({ success:true,data: jobSeekers });
  } catch (error) {
    res.status(500).json({ success:false,message: 'Error fetching job seekers.', error: error.message });
  }
};
