import {apiConnector} from "../services/apiConnector";
import { toast } from "react-toastify";

import {companyauthEndpoints} from "./api";
const { SIGNUP_API, VERIFY_SIGNUP_API, LOGIN_API, VERIFY_LOGIN_API } = companyauthEndpoints;
// Signup with OTP
export async function signup({ email }) {
  try {
    const response = await apiConnector("POST", SIGNUP_API, { email });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("OTP sent to email");
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error);
    toast.error(error.response?.data?.message || "Signup failed");
    return null;
  }
}

// Verify OTP for Signup
export async function verifySignup({ email, otp, name, phone, companyName, location, navigate }) {
  try {
    const response = await apiConnector("POST", VERIFY_SIGNUP_API, { email, otp, name, phone, companyName, location });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Signup successful");
    sessionStorage.setItem("userType", "company");
    sessionStorage.setItem("companyName", companyName);
    sessionStorage.setItem("companyPhone", phone);
    window.dispatchEvent(new Event("storage"));
    navigate('/');
    return response.data;
  } catch (error) {
    console.error("OTP Verification Error:", error);
    toast.error(error.response?.data?.message || "Invalid OTP or signup verification failed");
    return null;
  }
}


// Login with OTP
export async function login({ email }) {
  try {
    const response = await apiConnector("POST", LOGIN_API, { email });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("OTP sent to email" );
    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    toast.error(error.response?.data?.message || "Login failed" );
    return null;
  }
}

// Verify OTP for Login
export async function verifyLogin({ email, otp,navigate }) {
  try {
    const response = await apiConnector("POST", VERIFY_LOGIN_API, { email, otp });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    
    toast.success("Login successful" );
    // Store user type in session storage
    sessionStorage.setItem("userType", "company");
    sessionStorage.setItem("companyName", response.data.data.companyName);
    sessionStorage.setItem("companyPhone", response.data.data.phone);
    window.dispatchEvent(new Event("storage"));
    navigate('/')
    return response.data;
  } catch (error) {
    console.error("OTP Login Verification Error:", error);
    toast.error(error.response?.data?.message || "Invalid OTP or login verification failed" );
    return null;
  }
}
