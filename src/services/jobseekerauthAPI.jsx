import {apiConnector} from "../services/apiConnector";
import { toast } from "react-toastify";
import {jobseekerauthEndpoints} from "./api";
const { SIGNUP_API, VERIFY_SIGNUP_API, LOGIN_API, VERIFY_LOGIN_API } = jobseekerauthEndpoints;

// // Verify OTP for Signup
// export async function verifySignup({ email, otp, navigate }) {
//   try {
//     const response = await apiConnector("POST", VERIFY_SIGNUP_API, { email, otp });

//     if (!response.data.success) {
//       throw new Error(response.data.message);
//     }

//     toast.success("Signup successful");
//     sessionStorage.setItem("userType", "jobSeeker");
//     window.dispatchEvent(new Event("storage"));
//     navigate('/');
//     return response.data;
//   } catch (error) {
//     console.error("OTP Verification Error:", error);
//     toast.error(error.response?.data?.message || "Invalid OTP or signup verification failed");
//     return null;
//   }
// }

// // Signup with OTP
// export async function jobSeekerSignup({
//   full_name,
//   whatsapp_number,
//   email
// }) {
//   try {

//     const response = await apiConnector("POST", SIGNUP_API, {
//       full_name,
//       whatsapp_number,
//       email
//     });

//     if (!response.data.success) {
//       throw new Error(response.data.message);
//     }

//     toast.success("OTP sent to email");
//     return response.data;
//   } catch (error) {
//     console.error("Signup Error:", error);
//     toast.error(error.response?.data?.message || "Signup failed");
//     return null;
//   }
// }

// Login with OTP
export async function jobSeekerLogin({ email }) {
  try {
    const response = await apiConnector("POST", LOGIN_API, { email });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("OTP sent to email");
    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    toast.error(error.response?.data?.message || "Login failed");
    return null;
  }
}

// Verify OTP for Login
export async function verifyLogin({ email, otp, navigate }) {
  try {
    const response = await apiConnector("POST", VERIFY_LOGIN_API, { email, otp });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Login successful");
    sessionStorage.setItem("userType", "jobSeeker");
    window.dispatchEvent(new Event("storage"));
    navigate("/");
    return response.data;
  } catch (error) {
    console.error("OTP Verification Error:", error);
    toast.error(error.response?.data?.message || "Invalid OTP or login verification failed");
    return null;
  }
}

// Verify OTP for Signup
export async function verifySignup({ email, full_name, whatsapp_number,otp, navigate }) {
  try {
    const response = await apiConnector('POST', VERIFY_SIGNUP_API, { email, otp, full_name, whatsapp_number });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success('Signup successful');
    sessionStorage.setItem('userType', 'jobSeeker');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
    return response.data;
  } catch (error) {
    console.error('OTP Verification Error:', error);
    toast.error(error.response?.data?.message || 'Invalid OTP or signup verification failed');
    return null;
  }
}

// Signup with OTP
export async function jobSeekerSignup({ email }) {
  try {
    const response = await apiConnector('POST', SIGNUP_API, { email });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success('OTP sent to email');
    return response.data;
  } catch (error) {
    console.error('Signup Error:', error);
    toast.error(error.response?.data?.message || 'Signup failed');
    return null;
  }
}

