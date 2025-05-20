// "use client"
// import { useLocation } from "react-router-dom"
// import {
//   ArrowLeft,
//   Phone,
//   MapPin,
//   Calendar,
//   Briefcase,
//   Car,
//   Award,
//   Clock,
//   Mail,
//   Heart,
//   UserCheck,
// } from "lucide-react"

// const Profile = () => {
//   const { state } = useLocation()
//   const {
//     jobSeekerId,
//     name,
//     phone,
//     city,
//     age,
//     job_type,
//     experience,
//     work_time,
//     job_need,
//     vehicle,
//     profile,
//     email,
//   } = state || {}

//   // Get initials for avatar fallback
//   const getInitials = (name) => {
//     if (!name) return "U"
//     return name
//       .split(" ")
//       .map((part) => part[0])
//       .join("")
//       .toUpperCase()
//       .substring(0, 2)
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 sm:p-6">
//       <div className="w-full max-w-md">
//         <button
//           className="mb-4 text-gray-600 hover:text-gray-900 flex items-center"
//           onClick={() => window.history.back()}
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" /> Back
//         </button>

//         <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//           <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-center">
//             <div className="relative inline-block">
//               <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-md flex items-center justify-center">
//                 {profile ? (
//                   <img src={profile} alt={name} className="w-full h-full object-cover rounded-full" />
//                 ) : (
//                   <span className="text-xl font-bold text-blue-600">{getInitials(name)}</span>
//                 )}
//               </div>
//             </div>
//             <h2 className="text-2xl font-bold text-white mt-2">{name}</h2>
//             <span className="bg-blue-400/20 text-white text-sm py-1 px-3 rounded-full">
//               ID: {jobSeekerId}
//             </span>
//           </div>

//           <div className="p-6 space-y-6">
//             <div className="space-y-3">
//               <h3 className="text-gray-500 font-semibold">Contact Information</h3>
//               <div className="flex items-center">
//                 <Mail className="w-5 h-5 text-blue-500 mr-3" />
//                 <span>{email}</span>
//               </div>
//               <div className="flex items-center">
//                 <Phone className="w-5 h-5 text-blue-500 mr-3" />
//                 <span>{phone}</span>
//               </div>
//               <div className="flex items-center">
//                 <MapPin className="w-5 h-5 text-blue-500 mr-3" />
//                 <span>{city}</span>
//               </div>
//             </div>

//             <div className="space-y-3">
//               <h3 className="text-gray-500 font-semibold">Personal Details</h3>
//               <div className="flex items-center">
//                 <Calendar className="w-5 h-5 text-blue-500 mr-3" />
//                 <span>{age}</span>
//               </div>
//               <div className="flex items-center">
//                 <Heart className="w-5 h-5 text-blue-500 mr-3" />
//                 <span>{job_need}</span>
//               </div>
//             </div>

//             <div className="space-y-3">
//               <h3 className="text-gray-500 font-semibold">Professional Details</h3>
//               <div className="flex items-center">
//                 <Briefcase className="w-5 h-5 text-blue-500 mr-3" />
//                 <span>{job_type}</span>
//               </div>
//               <div className="flex items-center">
//                 <Award className="w-5 h-5 text-blue-500 mr-3" />
//                 <span>{experience}</span>
//               </div>
//               <div className="flex items-center">
//                 <Clock className="w-5 h-5 text-blue-500 mr-3" />
//                 <span>{work_time}</span>
//               </div>
//             </div>

//             <div className="space-y-3">
//               <h3 className="text-gray-500 font-semibold">Transportation</h3>
//               <div className="flex items-center">
//                 <Car className="w-5 h-5 text-blue-500 mr-3" />
//                 <span>{vehicle}</span>
//               </div>
//             </div>
//           </div>

//           <div className="p-6 border-t">
//             <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center">
//               Connect
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Profile


"use client"
import { useLocation } from "react-router-dom"
import {
  ArrowLeft,
  Phone,
  MapPin,
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
import { motion } from "framer-motion"

const Profile = () => {
  const { state } = useLocation()
  const {
    jobSeekerId,
    name,
    phone,
    city,
    age,
    job_type,
    job_type_1,
    experience,
    work_time,
    job_need,
    vehicle,
    profile_pic,
    email,
    vehicle_type
  } = state || {}
  // Mock Data matching the Mongoose schema
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
          onClick={() => window.history.back()}
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
              <div className="w-28 h-28 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                {profile_pic ? (
                  <img
                    src={profile_pic || "/placeholder.svg"}
                    alt={name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-indigo-600 text-transparent bg-clip-text">
                    {getInitials(name)}
                  </span>
                )}
              </div>
              <div
                className={`absolute -bottom-2 right-0 ${getAvailabilityColor(job_need)} w-6 h-6 rounded-full border-2 border-white flex items-center justify-center`}
              >
                <span className="sr-only">{formatJobNeedStatus(job_need)}</span>
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
              {formatJobNeedStatus(job_need)}
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
                    <Mail className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="text-slate-700 flex-1">{email}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </motion.div>

                <motion.div
                  className="flex items-center p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <Phone className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="text-slate-700 flex-1">{phone}</span>
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
              <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-wider">Job Preferences</h3>
              <div className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-start mb-6">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 mt-1">
                    <Briefcase className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500">Job Type</span>
                    {
                      job_type === "Other (please specify)" ? (
                        <span className="text-slate-700 font-medium text-sm">
                          {job_type_1}
                        </span>
                      ) : (
                        <span className="text-slate-700 font-medium text-sm">
                          {job_type}
                        </span>
                      )
                    }
                  </div>
                </div>
                <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <Heart className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500">Availability</span>
                      <span className="text-slate-700 font-medium text-sm">{formatJobNeedStatus(job_need)}</span>
                    </div>
                  </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3">
              <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-wider">Professional Details</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex flex-col">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                      <Award className="w-5 h-5 text-indigo-600" />
                    </div>
                    <span className="text-xs text-slate-500">Experience</span>
                    <span className="text-slate-700 font-medium text-sm">
                      {experience.includes("No") ? "No Experience" : "Experienced"}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex flex-col">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                      <Clock className="w-5 h-5 text-indigo-600" />
                    </div>
                    <span className="text-xs text-slate-500">Work Hours</span>
                    <span className="text-slate-700 font-medium text-sm">{work_time}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3">
              <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-wider">Experience Details</h3>
              <div className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 mt-1">
                    <Info className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-700 text-sm">{experience}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="p-6 border-t border-slate-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              className="w-full bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white py-3 rounded-xl flex items-center justify-center font-medium shadow-lg shadow-indigo-200"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Connect with {name.split(" ")[0]}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile
