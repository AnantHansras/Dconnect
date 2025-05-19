import { apiConnector } from "./apiConnector";
import { jobSeekerEndpoints } from "./api";
import { toast } from "react-toastify";

const {
  GET_JOBSEEKERS_API,
} = jobSeekerEndpoints;



export async function fetchJobSeekers(token) {
  try {
    const response = await apiConnector("GET", GET_JOBSEEKERS_API, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log("GET_JOBSEEKERS_API RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    console.error("GET_JOBSEEKERS_API ERROR:", error);
    toast.error("Failed to fetch jobseekers" );
    return null;
  }
}
