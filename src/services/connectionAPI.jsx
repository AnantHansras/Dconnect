// services/connectionApi.js
import { apiConnector } from "./apiConnector";
import { connectionEndpoints } from "./api";
import { toast } from "react-toastify";

const {
  CREATE_CONNECTION_API,
  GET_ALL_CONNECTIONS_API,
  APPLY_FOR_JOB_API,
  GET_ALL_APPLICATIONS_API
} = connectionEndpoints;

// POST a new connection
export async function makeConnection({ companyName, companyPhone, jobSeekerName, jobSeekerPhone }, token) {
  try {
    const requestData = {
      companyName,
      companyPhone,
      jobSeekerName,
      jobSeekerPhone,
    };

    const response = await apiConnector("POST", CREATE_CONNECTION_API, requestData, {
      Authorization: `Bearer ${token}`,
    });

    console.log("CREATE_CONNECTION_API RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Connection created successfully");
    return response.data;
  } catch (error) {
    console.error("CREATE_CONNECTION_API ERROR:", error);
    toast.error("Failed to create connection");
    return null;
  }
}

// GET all connections
export async function fetchAllConnections(token) {
  try {
    const response = await apiConnector("GET", GET_ALL_CONNECTIONS_API, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log("GET_ALL_CONNECTIONS_API RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    console.error("GET_ALL_CONNECTIONS_API ERROR:", error);
    toast.error("Failed to fetch connections");
    return null;
  }
}

// POST a new connection
export async function apply({ companyName, companyPhone, jobSeekerName, jobSeekerPhone }, token) {
  try {
    const requestData = {
      companyName,
      companyPhone,
      jobSeekerName,
      jobSeekerPhone,
    };

    const response = await apiConnector("POST", APPLY_FOR_JOB_API, requestData, {
      Authorization: `Bearer ${token}`,
    });

    console.log("APPLY_FOR_JOB_API RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Connection created successfully");
    return response.data;
  } catch (error) {
    console.error("APPLY_FOR_JOB_API ERROR:", error);
    toast.error("Failed to create connection");
    return null;
  }
}

// GET all connections
export async function fetchAllApplications(token) {
  try {
    const response = await apiConnector("GET", GET_ALL_APPLICATIONS_API, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log("GET_ALL_APPLICATIONS_API RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    console.error("GET_ALL_APPLICATIONS_API ERROR:", error);
    toast.error("Failed to fetch connections");
    return null;
  }
}