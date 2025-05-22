// services/jobApi.js
import { apiConnector } from "./apiConnector";
import { jobEndpoints } from "./api";
import { toast } from "react-toastify";

const {
  POST_JOB_API,
  GET_ALL_JOBS_API,
} = jobEndpoints;

// POST a new job
export async function postJob(jobData, token) {
  try {
    const response = await apiConnector("POST", POST_JOB_API, jobData, {
      Authorization: `Bearer ${token}`,
    });

    console.log("POST_JOB_API RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Job posted successfully");
    return response.data;
  } catch (error) {
    console.error("POST_JOB_API ERROR:", error);
    toast.error("Failed to post job");
    return null;
  }
}

// GET all jobs
export async function fetchAllJobs(token) {
  try {
    const response = await apiConnector("GET", GET_ALL_JOBS_API, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log("GET_ALL_JOBS_API RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    console.error("GET_ALL_JOBS_API ERROR:", error);
    toast.error("Failed to fetch jobs");
    return null;
  }
}
