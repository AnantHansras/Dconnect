"use client"
import { useLocation } from "react-router-dom"
import { makeConnection } from "../services/connectionAPI"
import { useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  Phone,
  MapPin,
  User,
  Calendar,
  Briefcase,
  Car,
  Award,
  Clock,
  Mail,
  Heart,
  ChevronRight,
  Info,
} from "lucide-react"
import { motion,AnimatePresence  } from "framer-motion"
import { useState } from "react"
const Profile = () => {
  const { state } = useLocation()
  const {
    jobSeekerId,
    name,
    phone,
    city,
    age,
    job_type,
    prior_exp,
    gender,
    experience,
    job_timing,
    vehicle,
    email,
    vehicle_type
  } = state || {}
 
  const data = {
    name: "John Doe",
    phone: "123-456-7890",
    city: "New York",
    age: 30,
    job_type: "Driver (Cab, Auto, Private)",
    job_type_1: "",
    vehicle_type: "Yes – Personal vehicle (Car, Auto, etc.)",
    vehicle: "Car",
    experience: "Yes, I have experience as a driver (cab, auto, etc.)",
    job_need: "Immediately – I'm available to start right away",
    work_time: "Flexible/Any time",
    profile_pic: "",
    email: "johndoe@example.com",
  }

  // Get initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Format job need status for display
  const formatJobNeedStatus = (status) => {
    console.log(status)
    if (status.includes("Immediately")) return "Available Now"
    if (status.includes("Within 1 week")) return "Available Soon"
    return "Exploring Options"
  }

  // Get availability color based on job need
  const getAvailabilityColor = (status) => {
    if (status.includes("Immediately")) return "bg-green-500"
    if (status.includes("Within 1 week")) return "bg-yellow-500"
    return "bg-blue-500"
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }
  const [showCheck, setShowCheck] = useState(false);
  const navigate = useNavigate();
  const companyName = sessionStorage.getItem("companyName");
  const companyPhone = sessionStorage.getItem("companyPhone");
  const handleClick = async () => {
    setShowCheck(true);
    await makeConnection({companyName, companyPhone,jobSeekerName:name,jobSeekerPhone:phone });
    setTimeout(() => setShowCheck(false), 1500); 
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pt-12">
      <div className="w-full max-w-md">
        

        <motion.div
          className="bg-white shadow-xl rounded-2xl overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-violet-500 to-indigo-600 p-8 text-center relative pt-12">
          <motion.button
          className="mb-4 text-slate-100 hover:text-slate-300 flex items-center font-medium -ml-4 -mt-4"
          onClick={() => navigate('/SearchDB')}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </motion.button>
            <motion.div
              className="relative inline-block mb-3"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="relative w-28 h-28 flex items-center justify-center">
  {/* Thin green ring */}
  <div className="absolute inset-0 rounded-full border-4 border-green-500"></div>

  {/* Avatar */}
  <div className="w-28 h-28 bg-white rounded-full border-2 border-white shadow-md flex items-center justify-center overflow-hidden">
    {data.profile_pic ? (
      <img
        src={data.profile_pic || "/placeholder.svg"}
        alt={name}
        className="w-full h-full object-cover rounded-full"
      />
    ) : (
      <span className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-indigo-600 text-transparent bg-clip-text">
        {getInitials(name)}
      </span>
    )}
  </div>

  {/* Tick icon */}
  <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm">
    <svg
      className="w-4 h-4 text-green-600"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </div>
</div>

              
            </motion.div>
            <motion.h2
              className="text-2xl font-bold text-white mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {name}
            </motion.h2>
            <motion.span
              className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs py-1 px-4 rounded-full mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
            Available
            </motion.span>
          </div>

          <motion.div className="p-6 space-y-6" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-wider">Contact Information</h3>
              <div className="space-y-3">
                <motion.div
                  className="flex items-center p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <User className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="text-slate-700 flex-1">{gender}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </motion.div>

                <motion.div
                  className="flex items-center p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <Briefcase className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="text-slate-700 flex-1">{job_timing}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </motion.div>

                <motion.div
                  className="flex items-center p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <MapPin className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="text-slate-700 flex-1">{city}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-[40%_60%] gap-4">
              <div className="space-y-3">
                <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-wider">Personal</h3>
                <div className="p-4 bg-slate-50 rounded-xl h-fit">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <Calendar className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500">Age</span>
                      <span className="text-slate-700 font-medium text-sm">{age}</span>
                    </div>
                  </div>
                  
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-wider">Transport</h3>
                <div className="p-4 bg-slate-50 rounded-xl h-fit">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <Car className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500">Vehicle</span>
                      <span className="text-slate-700 font-medium text-sm">
                        {vehicle_type.includes("No") ? "No Vehicle" : vehicle}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3">
              <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-wider">Professional Details</h3>
              <div className=" flex justify-normal gap-4">
                <div className="flex items-start  p-4 rounded-xl bg-slate-50">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 mt-1">
                    <Briefcase className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500">Job Type</span>
                        <span className="text-slate-700 font-medium text-sm">
                          {job_type}
                        </span>
                  </div>
                </div>
                <div className="flex items-start flex-[1] p-4  rounded-xl bg-slate-50">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 mt-1">
                    <Award className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500">Experience</span>
                    <span className="text-slate-700 font-medium text-sm">
                      {prior_exp.includes("No") ? "No Experience" : "Experienced"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3">
              <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-wider">Experience Details</h3>
              <div className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 mt-1">
                    <Info className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-700 text-sm font-medium ">{prior_exp === 'No' ? 'The candidate currently has no prior work experience.' : experience}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

         
      <div> <motion.div
            className="p-6 border-t border-slate-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              className="w-full bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white py-3 rounded-xl flex items-center justify-center font-medium shadow-lg shadow-indigo-200"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClick}
            >
              Connect with {name.split(" ")[0]}
            </motion.button>
          </motion.div>
          <AnimatePresence>
        {showCheck && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center w-80 md:w-96 h-52"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="bg-green-500 rounded-full p-8 ">
                <svg
                  className="w-16 h-16 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <br/>
              <div className="text-xl font-bold -mt-4">Done!</div>
              {/* <div>Our Team will connect you with Jobseeker</div> */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile
