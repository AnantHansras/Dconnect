export const BASE_URL = "https://dconnect-backend.onrender.com/"; // Replace with your actual backend URL

export const jobSeekerEndpoints = {
  ADD_JOBSEEKER_API: `${BASE_URL}/jobseeker/add`,
  GET_JOBSEEKERS_API: `${BASE_URL}/jobseeker/search`,
};

export const companyauthEndpoints = {
  SIGNUP_API: `${BASE_URL}/companyauth/signup`,
  VERIFY_SIGNUP_API: `${BASE_URL}/companyauth/verify-signup`,
  LOGIN_API: `${BASE_URL}/companyauth/login`,
  VERIFY_LOGIN_API: `${BASE_URL}/companyauth/verify-login`,
};

export const jobseekerauthEndpoints = {
  SIGNUP_API: `${BASE_URL}/auth/signup`,
  VERIFY_SIGNUP_API: `${BASE_URL}/auth/verify-signup`,
  LOGIN_API: `${BASE_URL}/auth/login`,
  VERIFY_LOGIN_API: `${BASE_URL}/auth/verify-login`,
};