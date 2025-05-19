import React, { useState } from "react";
import { Lock, User, Mail } from "lucide-react";
import { Phone, MapPin, Car, Image, Clock,Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import {jobSeekerSignup,verifySignup,jobSeekerLogin,verifyLogin  } from "../services/jobseekerauthAPI";

export default function AuthPageSeeker() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 py-12 pt-24">
      <div className="w-full max-w-sm space-y-6 bg-[var(--card)] p-6 rounded-[var(--radius)] shadow-lg border-2 border-[var(--border)]">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-[var(--card-foreground)]">
            Welcome
          </h2>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
            Sign in to your account or create a new one
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            className={`py-1.5 px-3 rounded-[var(--radius)] transition flex items-center justify-center gap-2 ${
              activeTab === "login"
                ? "bg-[#4A90E2] text-[var(--primary-foreground)]"
                : "bg-[var(--secondary)] hover:bg-[var(--muted)]"
            }`}
            onClick={() => setActiveTab("login")}
          >
            <Lock size={16} /> Login
          </button>
          <button
            className={`py-1.5 px-3 rounded-[var(--radius)] transition flex items-center justify-center gap-2 ${
              activeTab === "signup"
                ? "bg-[#4A90E2] text-[var(--primary-foreground)]"
                : "bg-[var(--secondary)] hover:bg-[var(--muted)]"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            <User size={16} />  SignUp
          </button>
        </div>

        {activeTab === "login" ? <Login /> : <Signup />}
      </div>
    </div>
  );
}

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email");
      return;
    }
    setIsLoading(true);
    const response = await jobSeekerLogin({ email });
    if (response) setOtpSent(true);
    setIsLoading(false)
    
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await verifyLogin({ email, otp, navigate});
    setIsLoading(false);
  };

  return (
    <div className="mt-4 space-y-2">
      {!otpSent ? (
        <form onSubmit={handleSendOtp} className="space-y-2">
          {error && <p className="text-[--destructive] text-xs">{error}</p>}
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-3.5" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 pl-10 pr-3 border border-[--border] rounded-[--radius] focus:outline-none focus:border-[--primary]"
              required
            />
          </div>
          <LoadingButton isLoading={isLoading} text="Send OTP" />
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-2">
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full py-2 pl-10 pr-3 border border-[--border] rounded-[--radius] focus:outline-none focus:border-[--primary]"
              maxLength={6}
              required
            />
          </div>
          <LoadingButton isLoading={isLoading} text="Verify & Login" />
        </form>
      )}
    </div>
  );
}

// function Signup() {
//   const navigate = useNavigate();
//   const steps = [
//     "Personal Information",
//     "Job Preferences",
//     "Vehicle Details",
//     "Document Upload",
//   ];
//   const [step, setStep] = useState(0);
//   const [formData, setFormData] = useState({
//     full_name: "",
//     whatsapp_number: "",
//     email: "",
//     job_preference: "",
//     city: "",
//     vehicle_number: "",
//     experience: "",
//     preferred_locations: [],
//     vehicle_type: "",
//     start_time: "",
//     end_time: "",
//     aadhar_image: null,
//     profile_image: null,
//   });
//   const [otp, setOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const isStepValid = () => {
//     switch (step) {
//       case 0:
//         return formData.full_name && formData.whatsapp_number && formData.city && formData.email;
//       case 1:
//         return (
//           formData.job_preference &&
//           formData.preferred_locations.length &&
//           formData.start_time &&
//           formData.end_time
//         );
//       case 2:
//         return formData.vehicle_number && formData.vehicle_type;
//       case 3:
//         return formData.aadhar_image && formData.profile_image;
//       default:
//         return false;
//     }
//   };

//   const handleNext = () => {
//     if (step === steps.length-1) {
//       setStep(step + 1);
//       handleSubmit();
//     } else {
//       setStep(step + 1);
//     }
//   };

//   const handleSubmit = async () => {
//     setIsLoading(true);
//     const response = await jobSeekerSignup({ ...formData,navigate });
//     if (response) setOtpSent(true);
//     setIsLoading(false);
//   };
//   const handleVerifyOtp = async (e) => {
//       e.preventDefault();
//       setIsLoading(true);
//       await verifySignup({ email: formData.email, otp,navigate  });
//       setIsLoading(false);
//     };
//   const handleBack = () => {
//     setStep((prev) => Math.max(prev - 1, 0));
//   };
//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData({ ...formData, [name]: files[0] });
//     console.log(files[0])
//   };
//   return (
//     <div className="mt-4 space-y-4">
//       <h3 className="text-lg font-semibold">{steps[step]}</h3>

//       {step === 0 && (
//         <div className="space-y-2">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="relative">
//               <User size={16} className="absolute left-3 top-3.5" />
//               <input
//                 type="text"
//                 name="full_name"
//                 placeholder="Full Name"
//                 value={formData.full_name}
//                 onChange={handleChange}
//                 className="w-full py-2 pl-10 pr-3 border border-[--border] rounded-[--radius] focus:outline-none focus:border-[--primary]"
//                 required
//               />
//             </div>
//             <div className="relative">
//               <Mail size={16} className="absolute left-3 top-3.5" />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full py-2 pl-10 pr-3 border border-[--border] rounded-[--radius] focus:outline-none focus:border-[--primary]"
//                 required
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div className="relative">
//               <Phone size={16} className="absolute left-3 top-3.5" />
//               <input
//                 type="tel"
//                 name="whatsapp_number"
//                 placeholder="Number"
//                 value={formData.whatsapp_number}
//                 onChange={handleChange}
//                 className="w-full py-2 pl-10 pr-3 border border-[--border] rounded-[--radius] focus:outline-none focus:border-[--primary]"
//                 required
//               />
//             </div>
//             <div className="relative">
//               <MapPin size={16} className="absolute left-3 top-3.5" />
//               <input
//                 type="text"
//                 name="city"
//                 placeholder="City"
//                 value={formData.city}
//                 onChange={handleChange}
//                 className="w-full py-2 pl-10 pr-3 border border-[--border] rounded-[--radius] focus:outline-none focus:border-[--primary]"
//                 required
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {step === 1 && (
//         <div className="space-y-2">
//           <select
//             name="job_preference"
//             value={formData.job_preference}
//             onChange={handleChange}
//             className="w-full py-2 px-3 border rounded-[--radius] "
//             required
//           >
//             <option value="">Select Job Preference</option>
//             <option value="delivery">Delivery</option>
//             <option value="ride-sharing">Ride Sharing</option>
//           </select>

//           <input
//             type="text"
//             name="preferred_locations"
//             placeholder="Preferred Locations (comma-separated)"
//             value={formData.preferred_locations}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 preferred_locations: e.target.value.split(","),
//               })
//             }
//             className="w-full py-2 px-3 border rounded-[--radius] "
//           />

//           <div className="flex gap-4">
//   <div className="flex gap-4">
//   <div className="flex flex-col">
//     <label className="mb-1 text-sm font-medium">Preferred Timings</label>
//     <div className="flex gap-2">
//     <label className="mb-1 text-sm font-medium">Start Time:</label>
//       <input
//         type="time"
//         name="start_time"
//         value={formData.start_time}
//         onChange={handleChange}
//         className="w-full py-2 px-3 border rounded-[--radius]"
//       />
//       <label className="mb-1 text-sm font-medium">End Time:</label>
//       <input
//         type="time"
//         name="end_time"
//         value={formData.end_time}
//         onChange={handleChange}
//         className="w-full py-2 px-3 border rounded-[--radius]"
//       />
//     </div>
//   </div>
// </div>
  
// </div>

//         </div>
//       )}

//       {step === 2 && (
//         <div className="space-y-2">
//           <input
//             type="text"
//             name="vehicle_number"
//             placeholder="Vehicle Number"
//             value={formData.vehicle_number}
//             onChange={handleChange}
//             className="w-full py-2 px-3 border rounded-[--radius] "
//           />
//           <select
//             name="vehicle_type"
//             value={formData.vehicle_type}
//             onChange={handleChange}
//             className="w-full py-2 px-3 border rounded-[--radius] "
//           >
//             <option value="">Select Vehicle Type</option>
//             <option value="bike">Bike</option>
//             <option value="car">Car</option>
//             <option value="van">Van</option>
//             <option value="truck">Truck</option>
//           </select>
//         </div>
//       )}

//       {step === 3 && (
//         <div className="space-y-2">
//           <div className="space-y-1">
//             <label htmlFor="aadhar_image" className="block text-sm font-medium">
//               Aadhar Card
//             </label>
//             <input
//               type="file"
//               name="aadhar_image"
//               id="aadhar_image"
//               onChange={handleFileChange}
//               className="w-full py-2 px-3 border rounded-[--radius] "
//             />
//             {formData.aadhar_image && (
//               <img src={URL.createObjectURL(formData.aadhar_image)} alt="Aadhar Preview" className="h-24 w-24 object-cover mt-2" />
//             )}
//           </div>

//           <div className="space-y-1">
//             <label
//               htmlFor="profile_image"
//               className="block text-sm font-medium"
//             >
//               Profile Pic
//             </label>
//             <input
//               type="file"
//               name="profile_image"
//               id="profile_image"
//               onChange={handleFileChange}
//               className="w-full py-2 px-3 border rounded-[--radius] "
//             />
//             {formData.profile_image && (
//               <img src={URL.createObjectURL(formData.profile_image)} alt="Profile Preview" className="h-24 w-24 object-cover mt-2" />
//             )}
//           </div>
//         </div>
//       )}
//       {step === 4 && (
//         <div className="space-y-2">
//           <input
//             type="text"
//             name="otp"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             className="w-full py-2 px-3 border rounded-[--radius] "
//             maxLength={6}
//           />

//           <button
//             className="w-full bg-[#4A90E2] py-2 px-4 rounded text-white mx-auto"
//             onClick={(e) => handleVerifyOtp(e)}
//           >
//              SignUp
//           </button>
//         </div>
//       )}
// {
//   step !== steps.length && (
//     <div className="flex justify-between">
//         <button
//           onClick={handleBack}
//           disabled={step === 0}
//           className="bg-gray-300 py-2 px-4 rounded"
//         >
//           Back
//         </button>
//         <button
//           onClick={handleNext}
//           disabled={!isStepValid()}
//           className={`py-2 px-4 rounded-[--radius] text-white ${!isStepValid() ? "bg-gray-300" : "bg-[var(--primary)]"}`}
//         >
//           {step === steps.length - 1 ? "Submit" : "Next"}
//         </button>
//     </div>
//   )
// }
      
//     </div>
//   );
// }

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await jobSeekerSignup({ email: formData.email });
    if (response) setOtpSent(true);
    setIsLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await verifySignup({ email:formData.email,full_name:formData.name,whatsapp_number:formData.phone,otp,navigate });
    setIsLoading(false);
  };

  return (
    <div className="mt-4 space-y-2">
      {!otpSent ? (
        <form onSubmit={handleSendOtp} className="space-y-2">
          {error && <p className="text-[--destructive] text-xs">{error}</p>}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <User size={16} className="absolute left-3 top-3.5" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full py-2 pl-10 pr-3 border border-[--border] rounded-[--radius] focus:outline-none focus:border-[--primary]"
                required
              />
            </div>
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-3.5" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full py-2 pl-10 pr-3 border border-[--border] rounded-[--radius] focus:outline-none focus:border-[--primary]"
                required
              />
            </div>
          </div>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-3.5" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-2 pl-10 pr-3 border border-[--border] rounded-[--radius] focus:outline-none focus:border-[--primary]"
              required
            />
          </div>
          <LoadingButton isLoading={isLoading} text="Send OTP" />
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-2">
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full py-2 pl-10 pr-3 border border-[--border] rounded-[--radius] focus:outline-none focus:border-[--primary]"
              maxLength={6}
              required
            />
          </div>
          <LoadingButton isLoading={isLoading} text="Verify & Signup" />
        </form>
      )}
    </div>
  );
}



function LoadingButton({ isLoading, text }) {
  return (
    <button
      className="w-full py-2 rounded-[--radius] flex items-center justify-center gap-2 
        bg-[#4A90E2] text-[var(--primary-foreground)] focus:outline-none 
        hover:scale-105 active:scale-90 transition-all duration-300 ease-in-out"
    >
      {isLoading ? (
        <div className="flex flex-row justify-center items-center text-center mx-auto">
          <Loader2
            className="animate-spin mr-2 text-[var(--primary-foreground)]"
            size={20}
          />{" "}
          <span>Loading</span>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
}
