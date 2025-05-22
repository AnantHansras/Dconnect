
const {Job} = require('../Models/job.js');
exports.postJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();

    res.status(201).json({
      success: true,
      message: 'Job posted successfully',
      data: job,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to post job',
      error: error.message,
    });
  }
};


exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({
      success: true,
      message: 'Jobs fetched successfully',
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch jobs',
      error: error.message,
    });
  }
};
