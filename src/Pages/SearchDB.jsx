// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { fetchJobSeekers } from "../services/jobseekerAPI";
// import { MapPin, Clock, Car, User } from "lucide-react";

// const SearchDB = () => {
//   const navigate = useNavigate();
//   const [jobSeekers, setJobSeekers] = useState([]);
//   const [searchLocation, setSearchLocation] = useState("");
//   const [vehicleFilter, setVehicleFilter] = useState("");
//   const [workTimeFilter, setWorkTimeFilter] = useState("");
//   const [filteredJobSeekers, setFilteredJobSeekers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showFilters, setShowFilters] = useState(false);

//   useEffect(() => {
//     const getAllJobSeekers = async () => {
//       setIsLoading(true);
//       try {
//         const data = await fetchJobSeekers();
//         if (data && data.data) {
//           setJobSeekers(data.data);
//           setFilteredJobSeekers(data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching job seekers:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     getAllJobSeekers();
//   }, []);

//   useEffect(() => {
//     const filtered = jobSeekers.filter((js) => {
//       const matchLocation = searchLocation ? js.city.toLowerCase().includes(searchLocation.toLowerCase()) : true;
//       const matchVehicle = vehicleFilter ? js.vehicle_type === vehicleFilter : true;
//       const matchWorkTime = workTimeFilter ? js.work_time === workTimeFilter : true;

//       return matchLocation && matchVehicle && matchWorkTime;
//     });
//     setFilteredJobSeekers(filtered);
//   }, [searchLocation, vehicleFilter, workTimeFilter, jobSeekers]);

//   const handleNavigate = (jobSeeker) => {
//     navigate(`/profile`, {
//       state: {
//         jobSeekerId: jobSeeker._id,
//         name: jobSeeker.name,
//         phone: jobSeeker.phone,
//         city: jobSeeker.city,
//         age: jobSeeker.age,
//         job_type: jobSeeker.job_type,
//         job_type_1: jobSeeker.job_type_1,
//         experience: jobSeeker.experience,
//         work_time: jobSeeker.work_time,
//         job_need: jobSeeker.job_need,
//         vehicle: jobSeeker.vehicle,
//         profile: jobSeeker.profile,
//         email: jobSeeker.email,
//         vehicle_type: jobSeeker.vehicle_type,
//       },
//     });
//   };

//   const resetFilters = () => {
//     setSearchLocation("");
//     setVehicleFilter("");
//     setWorkTimeFilter("");
//   };

//   return (
//     <div className="w-full min-h-screen bg-gray-50 ">
//       <div className="sticky top-0 z-10 bg-white shadow-sm p-4 pt-24">
//         <h2 className="text-xl font-bold mb-3 text-center">Find Jobseekers</h2>
//         <div className="flex items-center gap-2">
//           <input
//             type="text"
//             placeholder="Search by location..."
//             value={searchLocation}
//             onChange={(e) => setSearchLocation(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring focus:ring-blue-500"
//           />
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//           >
//             Filters
//           </button>
//         </div>
//       </div>

//       {showFilters && (
//         <div className="bg-white p-4 border-t border-b">
//           <div className="mb-4">
//             <label>Vehicle Type</label>
//             <select
//               value={vehicleFilter}
//               onChange={(e) => setVehicleFilter(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-200 rounded-lg"
//             >
//               <option value="">All Vehicle Types</option>
//               <option value="Yes – Personal bike (for deliveries)">Bike</option>
//               <option value="Yes – Personal vehicle (Car, Auto, etc.)">Car/Auto</option>
//               <option value="No – I'm looking for jobs that don't require a vehicle">No Vehicle</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             <label>Work Time</label>
//             <select
//               value={workTimeFilter}
//               onChange={(e) => setWorkTimeFilter(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-200 rounded-lg"
//             >
//               <option value="">All Work Times</option>
//               <option value="Morning (6 AM – 12 PM)">Morning</option>
//               <option value="Afternoon (12 PM – 6 PM)">Afternoon</option>
//               <option value="Evening (6 PM – 10 PM)">Evening</option>
//               <option value="Night (10 PM – 6 AM)">Night</option>
//               <option value="Flexible/Any time">Flexible</option>
//             </select>
//           </div>

//           <button onClick={resetFilters} className="px-4 py-2 bg-gray-300 rounded-lg">
//             Reset Filters
//           </button>
//         </div>
//       )}

//       <div className="p-4">
//         {isLoading ? (
//           <div>Loading...</div>
//         ) : filteredJobSeekers.length > 0 ? (
//           <div className="grid gap-4">
//             {filteredJobSeekers.map((js) => (
//               <div
//   key={js._id}
//   className="bg-white p-6 border border-gray-100 shadow-lg rounded-2xl flex items-center gap-6 cursor-pointer hover:bg-gray-50 transition duration-300"
//   onClick={() => handleNavigate(js)}
// >
//   <img
//     src={"https://www.w3schools.com/w3images/avatar2.png"}
//     alt="Profile"
//     className="w-16 h-16 rounded-full border border-gray-200 object-cover"
//   />
//   <div>
//     <h3 className="font-semibold flex items-center gap-3 text-lg">
//       <User className="w-5 h-5 text-gray-500" /> {js.name}
//     </h3>
//     <p className="text-sm flex items-center gap-2 text-gray-600">
//       <MapPin className="w-5 h-5 text-gray-400" /> {js.city}
//     </p>
//     <p className="text-sm flex items-center gap-2 text-gray-600">
//       <Clock className="w-5 h-5 text-gray-400" /> {
//     js.work_time.includes('Morning') ? 'Morning' :
//     js.vehicle_type.includes('Night') ? 'Night' :
//     js.work_time.includes('Afternoon') ? 'Afternoon' :
//     js.vehicle_type.includes('Evening') ? 'Evening' : js.work_time
//   }
//     </p>
//     <p className="text-sm flex items-center gap-2 text-gray-600">
//   <Car className="w-5 h-5 text-gray-400" /> {
//     js.vehicle_type.includes('bike') ? 'Bike' :
//     js.vehicle_type.includes('vehicle') ? 'Vehicle' :
//     js.vehicle_type.includes('No') ? 'No Vehicle' : js.vehicle_type
//   }
// </p>

//   </div>
// </div>

//             ))}
//           </div>
//         ) : (
//           <div>No jobseekers found</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchDB;
// "use client"

// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { fetchJobSeekers } from "../services/jobseekerAPI"
// import { MapPin, Clock, Car, Search, Filter, X, ArrowRight } from "lucide-react"

// const SearchDB = () => {
//   const navigate = useNavigate()
//   const [jobSeekers, setJobSeekers] = useState([])
//   const [searchLocation, setSearchLocation] = useState("")
//   const [vehicleFilter, setVehicleFilter] = useState("all")
//   const [workTimeFilter, setWorkTimeFilter] = useState("all")
//   const [filteredJobSeekers, setFilteredJobSeekers] = useState([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [isFilterOpen, setIsFilterOpen] = useState(false)

//   useEffect(() => {
//     const getAllJobSeekers = async () => {
//       setIsLoading(true)
//       try {
//         const data = await fetchJobSeekers()
//         if (data && data.data) {
//           setJobSeekers(data.data)
//           setFilteredJobSeekers(data.data)
//         }
//       } catch (error) {
//         console.error("Error fetching job seekers:", error)
//       } finally {
//         setIsLoading(false)
//       }
//     }
//     getAllJobSeekers()
//   }, [])

//   useEffect(() => {
//     const filtered = jobSeekers.filter((js) => {
//       const matchLocation = searchLocation ? js.city.toLowerCase().includes(searchLocation.toLowerCase()) : true
//       const matchVehicle = vehicleFilter !== "all" ? js.vehicle_type === vehicleFilter : true
//       const matchWorkTime = workTimeFilter !== "all" ? js.work_time === workTimeFilter : true

//       return matchLocation && matchVehicle && matchWorkTime
//     })
//     setFilteredJobSeekers(filtered)
//   }, [searchLocation, vehicleFilter, workTimeFilter, jobSeekers])

//   const handleNavigate = (jobSeeker) => {
//     navigate(`/profile`, {
//       state: {
//         jobSeekerId: jobSeeker._id,
//         name: jobSeeker.name,
//         phone: jobSeeker.phone,
//         city: jobSeeker.city,
//         age: jobSeeker.age,
//         job_type: jobSeeker.job_type,
//         job_type_1: jobSeeker.job_type_1,
//         experience: jobSeeker.experience,
//         work_time: jobSeeker.work_time,
//         job_need: jobSeeker.job_need,
//         vehicle: jobSeeker.vehicle,
//         profile: jobSeeker.profile,
//         email: jobSeeker.email,
//         vehicle_type: jobSeeker.vehicle_type,
//       },
//     })
//   }

//   const resetFilters = () => {
//     setSearchLocation("")
//     setVehicleFilter("all")
//     setWorkTimeFilter("all")
//   }

//   const getVehicleLabel = (vehicleType) => {
//     if (vehicleType.includes("bike")) return "Bike"
//     if (vehicleType.includes("vehicle")) return "Vehicle"
//     if (vehicleType.includes("No")) return "No Vehicle"
//     return vehicleType
//   }

//   const getWorkTimeLabel = (workTime) => {
//     if (workTime.includes("Morning")) return "Morning"
//     if (workTime.includes("Night")) return "Night"
//     if (workTime.includes("Afternoon")) return "Afternoon"
//     if (workTime.includes("Evening")) return "Evening"
//     return workTime
//   }

//   const getActiveFiltersCount = () => {
//     let count = 0
//     if (vehicleFilter !== "all") count++
//     if (workTimeFilter !== "all") count++
//     return count
//   }

//   // Close filter sheet when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isFilterOpen && !event.target.closest(".filter-sheet") && !event.target.closest(".filter-button")) {
//         setIsFilterOpen(false)
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [isFilterOpen])

//   return (
//     <div className="w-full min-h-screen bg-slate-50">
//       <div className="sticky top-0 z-10 bg-white shadow-sm p-4 pt-20 pb-4">
//         <h2 className="text-2xl font-bold mb-4 text-center text-slate-800">Find Jobseekers</h2>
//         <div className="flex items-center gap-2">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
//             <input
//               type="text"
//               placeholder="Search by location..."
//               value={searchLocation}
//               onChange={(e) => setSearchLocation(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all"
//             />
//             {searchLocation && (
//               <button
//                 onClick={() => setSearchLocation("")}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             )}
//           </div>

//           <button
//             onClick={() => setIsFilterOpen(true)}
//             className="filter-button h-10 w-10 rounded-xl border border-slate-200 flex items-center justify-center bg-white hover:bg-slate-50 transition-colors relative"
//           >
//             <Filter className="h-5 w-5 text-slate-600" />
//             {getActiveFiltersCount() > 0 && (
//               <span className="absolute -top-1 -right-1 bg-slate-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                 {getActiveFiltersCount()}
//               </span>
//             )}
//           </button>
//         </div>

//         {(vehicleFilter !== "all" || workTimeFilter !== "all") && (
//           <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
//             {vehicleFilter !== "all" && (
//               <div className="px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1 whitespace-nowrap bg-white text-sm">
//                 <Car className="h-3 w-3 text-slate-500" />
//                 <span className="text-slate-700">{getVehicleLabel(vehicleFilter)}</span>
//                 <button onClick={() => setVehicleFilter("all")} className="ml-1 text-slate-400 hover:text-slate-600">
//                   <X className="h-3 w-3" />
//                 </button>
//               </div>
//             )}
//             {workTimeFilter !== "all" && (
//               <div className="px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1 whitespace-nowrap bg-white text-sm">
//                 <Clock className="h-3 w-3 text-slate-500" />
//                 <span className="text-slate-700">{getWorkTimeLabel(workTimeFilter)}</span>
//                 <button onClick={() => setWorkTimeFilter("all")} className="ml-1 text-slate-400 hover:text-slate-600">
//                   <X className="h-3 w-3" />
//                 </button>
//               </div>
//             )}
//             {(vehicleFilter !== "all" || workTimeFilter !== "all") && (
//               <button onClick={resetFilters} className="text-xs text-slate-500 underline whitespace-nowrap">
//                 Clear all
//               </button>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Filter Sheet */}
//       {isFilterOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
//           <div className="filter-sheet bg-white w-[300px] sm:w-[400px] h-full shadow-xl transform transition-transform duration-300 ease-in-out overflow-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-lg font-semibold text-slate-800">Filters</h3>
//                 <button
//                   onClick={() => setIsFilterOpen(false)}
//                   className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-slate-100"
//                 >
//                   <X className="h-5 w-5 text-slate-500" />
//                 </button>
//               </div>

//               <div className="space-y-6">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-slate-700">Vehicle Type</label>
//                   <div className="relative">
//                     <select
//                       value={vehicleFilter}
//                       onChange={(e) => setVehicleFilter(e.target.value)}
//                       className="w-full px-4 py-2 border border-slate-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white"
//                     >
//                       <option value="all">All Vehicle Types</option>
//                       <option value="Yes – Personal bike (for deliveries)">Bike</option>
//                       <option value="Yes – Personal vehicle (Car, Auto, etc.)">Car/Auto</option>
//                       <option value="No – I'm looking for jobs that don't require a vehicle">No Vehicle</option>
//                     </select>
//                     <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                       <svg
//                         className="w-5 h-5 text-slate-400"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-slate-700">Work Time</label>
//                   <div className="relative">
//                     <select
//                       value={workTimeFilter}
//                       onChange={(e) => setWorkTimeFilter(e.target.value)}
//                       className="w-full px-4 py-2 border border-slate-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white"
//                     >
//                       <option value="all">All Work Times</option>
//                       <option value="Morning (6 AM – 12 PM)">Morning</option>
//                       <option value="Afternoon (12 PM – 6 PM)">Afternoon</option>
//                       <option value="Evening (6 PM – 10 PM)">Evening</option>
//                       <option value="Night (10 PM – 6 AM)">Night</option>
//                       <option value="Flexible/Any time">Flexible</option>
//                     </select>
//                     <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                       <svg
//                         className="w-5 h-5 text-slate-400"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="pt-4">
//                   <button
//                     onClick={resetFilters}
//                     className="w-full py-2 px-4 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
//                   >
//                     Reset All Filters
//                   </button>
//                 </div>

//                 <div className="pt-4">
//                   <button
//                     onClick={() => setIsFilterOpen(false)}
//                     className="w-full py-2 px-4 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors"
//                   >
//                     Apply Filters
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="p-4 pb-20">
//         {isLoading ? (
//           <div className="space-y-4">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm">
//                 <div className="p-4 flex items-center gap-4">
//                   <div className="h-16 w-16 rounded-full bg-slate-200 animate-pulse"></div>
//                   <div className="space-y-2 flex-1">
//                     <div className="h-5 bg-slate-200 rounded w-3/4 animate-pulse"></div>
//                     <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse"></div>
//                     <div className="h-4 bg-slate-200 rounded w-2/3 animate-pulse"></div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : filteredJobSeekers.length > 0 ? (
//           <div className="space-y-4">
//             {filteredJobSeekers.map((js) => (
//               <div
//                 key={js._id}
//                 className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
//                 onClick={() => handleNavigate(js)}
//               >
//                 <div className="p-4 flex items-center gap-4">
//                   <div className="h-16 w-16 rounded-full border border-slate-200 overflow-hidden bg-slate-100 flex items-center justify-center">
//                     <img
//                       src="https://www.w3schools.com/w3images/avatar2.png"
//                       alt={js.name}
//                       className="h-full w-full object-cover"
//                       onError={(e) => {
//                         e.target.onerror = null
//                         e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(js.name)}&background=random`
//                       }}
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex justify-between items-start">
//                       <h3 className="font-semibold text-lg text-slate-800">{js.name}</h3>
//                       <ArrowRight className="h-5 w-5 text-slate-400" />
//                     </div>
//                     <div className="mt-1 space-y-1">
//                       <p className="text-sm flex items-center gap-2 text-slate-600">
//                         <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
//                         <span className="truncate">{js.city}</span>
//                       </p>
//                       <div className="flex flex-wrap gap-2 mt-2">
//                         <div className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs flex items-center gap-1">
//                           <Clock className="w-3 h-3" />
//                           {getWorkTimeLabel(js.work_time)}
//                         </div>
//                         <div className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs flex items-center gap-1">
//                           <Car className="w-3 h-3" />
//                           {getVehicleLabel(js.vehicle_type)}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="flex flex-col items-center justify-center py-12 text-center">
//             <div className="bg-slate-100 p-4 rounded-full mb-4">
//               <Search className="h-8 w-8 text-slate-400" />
//             </div>
//             <h3 className="text-lg font-medium text-slate-800">No jobseekers found</h3>
//             <p className="text-slate-500 mt-1">Try adjusting your filters</p>
//             <button
//               onClick={resetFilters}
//               className="mt-4 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
//             >
//               Reset Filters
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default SearchDB


"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchJobSeekers } from "../services/jobseekerAPI"
import { MapPin, Clock, Car, Search, Filter, X, ArrowRight, Briefcase } from "lucide-react"

const SearchDB = () => {
  const navigate = useNavigate()
  const [jobSeekers, setJobSeekers] = useState([])
  const [searchLocation, setSearchLocation] = useState("")
  const [vehicleFilter, setVehicleFilter] = useState("all")
  const [workTimeFilter, setWorkTimeFilter] = useState("all")
  const [filteredJobSeekers, setFilteredJobSeekers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    const getAllJobSeekers = async () => {
      setIsLoading(true)
      try {
        const data = await fetchJobSeekers()
        if (data && data.data) {
          setJobSeekers(data.data)
          setFilteredJobSeekers(data.data)
        }
      } catch (error) {
        console.error("Error fetching job seekers:", error)
      } finally {
        setIsLoading(false)
      }
    }
    getAllJobSeekers()
  }, [])

  useEffect(() => {
    const filtered = jobSeekers.filter((js) => {
      const matchLocation = searchLocation ? js.city.toLowerCase().includes(searchLocation.toLowerCase()) : true
      const matchVehicle = vehicleFilter !== "all" ? js.vehicle_type === vehicleFilter : true
      const matchWorkTime = workTimeFilter !== "all" ? js.work_time === workTimeFilter : true

      return matchLocation && matchVehicle && matchWorkTime
    })
    setFilteredJobSeekers(filtered)
  }, [searchLocation, vehicleFilter, workTimeFilter, jobSeekers])

  const handleNavigate = (jobSeeker) => {
    navigate(`/profile`, {
      state: {
        jobSeekerId: jobSeeker._id,
        name: jobSeeker.name,
        phone: jobSeeker.phone,
        city: jobSeeker.city,
        age: jobSeeker.age,
        job_type: jobSeeker.job_type,
        job_type_1: jobSeeker.job_type_1,
        experience: jobSeeker.experience,
        work_time: jobSeeker.work_time,
        job_need: jobSeeker.job_need,
        vehicle: jobSeeker.vehicle,
        profile: jobSeeker.profile,
        email: jobSeeker.email,
        vehicle_type: jobSeeker.vehicle_type,
        profile_pic: jobSeeker.profile_pic,
      },
    })
  }

  const resetFilters = () => {
    setSearchLocation("")
    setVehicleFilter("all")
    setWorkTimeFilter("all")
  }

  const getVehicleLabel = (vehicleType) => {
    if (vehicleType.includes("bike")) return "Bike"
    if (vehicleType.includes("vehicle")) return "Vehicle"
    if (vehicleType.includes("No")) return "No Vehicle"
    return vehicleType
  }

  const getWorkTimeLabel = (workTime) => {
    if (workTime.includes("Morning")) return "Morning"
    if (workTime.includes("Night")) return "Night"
    if (workTime.includes("Afternoon")) return "Afternoon"
    if (workTime.includes("Evening")) return "Evening"
    return workTime
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (vehicleFilter !== "all") count++
    if (workTimeFilter !== "all") count++
    return count
  }

  // Close filter sheet when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isFilterOpen && !event.target.closest(".filter-sheet") && !event.target.closest(".filter-button")) {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isFilterOpen])

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="sticky top-0 z-10 bg-slate-50 p-4 pt-20 pb-2 md:pb-6">
        <h2 className="text-2xl font-bold mb-5 text-center text-black">Find Jobseekers</h2>
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by location..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full pl-10 bg-white  pr-4 py-3 border-0 rounded-xl focus:outline-none ring-1 ring-blue-300 focus:ring-2 focus:ring-blue-300 transition-all shadow-sm"
            />
            {searchLocation && (
              <button
                onClick={() => setSearchLocation("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="filter-button h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center hover:bg-blue-50 transition-colors relative"
          >
            <Filter className="h-5 w-5 text-blue-500" />
            {getActiveFiltersCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                {getActiveFiltersCount()}
              </span>
            )}
          </button>
        </div>

        {(vehicleFilter !== "all" || workTimeFilter !== "all") && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1 max-w-md mx-auto">
            {vehicleFilter !== "all" && (
              <div className="px-3 py-1 rounded-full bg-white bg-opacity-90 shadow-sm flex items-center gap-1 whitespace-nowrap text-sm">
                <Car className="h-3 w-3 text-blue-500" />
                <span className="text-blue-800">{getVehicleLabel(vehicleFilter)}</span>
                <button onClick={() => setVehicleFilter("all")} className="ml-1 text-blue-400 hover:text-blue-600">
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            {workTimeFilter !== "all" && (
              <div className="px-3 py-1 rounded-full bg-white bg-opacity-90 shadow-sm flex items-center gap-1 whitespace-nowrap text-sm">
                <Clock className="h-3 w-3 text-blue-500" />
                <span className="text-blue-800">{getWorkTimeLabel(workTimeFilter)}</span>
                <button onClick={() => setWorkTimeFilter("all")} className="ml-1 text-blue-400 hover:text-blue-600">
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            {(vehicleFilter !== "all" || workTimeFilter !== "all") && (
              <button
                onClick={resetFilters}
                className="text-xs text-white hover:text-blue-100 underline whitespace-nowrap"
              >
                Clear all
              </button>
            )}
          </div>
        )}
      </div>

      {/* Filter Sheet */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-end transition-opacity duration-300">
          <div className="filter-sheet bg-white w-[300px] sm:w-[400px] h-full shadow-xl transform transition-transform duration-300 ease-in-out overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-blue-800">Filters</h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-blue-50 text-blue-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-blue-700">Vehicle Type</label>
                  <div className="relative">
                    <select
                      value={vehicleFilter}
                      onChange={(e) => setVehicleFilter(e.target.value)}
                      className="w-full px-4 py-3 border border-blue-100 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-blue-800"
                    >
                      <option value="all">All Vehicle Types</option>
                      <option value="Yes – Personal bike (for deliveries)">Bike</option>
                      <option value="Yes – Personal vehicle (Car, Auto, etc.)">Car/Auto</option>
                      <option value="No – I'm looking for jobs that don't require a vehicle">No Vehicle</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-blue-700">Work Time</label>
                  <div className="relative">
                    <select
                      value={workTimeFilter}
                      onChange={(e) => setWorkTimeFilter(e.target.value)}
                      className="w-full px-4 py-3 border border-blue-100 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-blue-800"
                    >
                      <option value="all">All Work Times</option>
                      <option value="Morning (6 AM – 12 PM)">Morning</option>
                      <option value="Afternoon (12 PM – 6 PM)">Afternoon</option>
                      <option value="Evening (6 PM – 10 PM)">Evening</option>
                      <option value="Night (10 PM – 6 AM)">Night</option>
                      <option value="Flexible/Any time">Flexible</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={resetFilters}
                    className="w-full py-3 px-4 border border-blue-200 rounded-lg text-blue-600 font-medium hover:bg-blue-50 transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-600 transition-colors shadow-sm"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 pb-20 max-w-md mx-auto">
        {isLoading ? (
          <div className="space-y-4 mt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden border border-blue-100 shadow-md">
                <div className="p-4 flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-blue-100 animate-pulse"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-5 bg-blue-100 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-blue-100 rounded w-1/2 animate-pulse"></div>
                    <div className="h-4 bg-blue-100 rounded w-2/3 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredJobSeekers.length > 0 ? (
          <div className="space-y-4 mt-4">
            {filteredJobSeekers.map((js) => (
              <div
                key={js._id}
                className="bg-white rounded-xl overflow-hidden border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                onClick={() => handleNavigate(js)}
              >
                <div className="p-5 flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full border-2 border-blue-200 overflow-hidden bg-blue-50 flex items-center justify-center shadow-sm">
                    <img
                      src={js.profile_pic}
                      alt={js.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(js.name)}&background=dbeafe&color=1e40af`
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg text-blue-900">{js.name}</h3>
                      <div className="bg-blue-50 p-1 rounded-full">
                        <ArrowRight className="h-5 w-5 text-blue-500" />
                      </div>
                    </div>
                    <div className="mt-2 space-y-2">
                      <p className="text-sm flex items-center gap-2 text-blue-700">
                        <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span className="truncate">{js.city}</span>
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center gap-1 font-medium">
                          <Clock className="w-3 h-3" />
                          {getWorkTimeLabel(js.work_time)}
                        </div>
                        <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center gap-1 font-medium">
                          <Car className="w-3 h-3 mr-1" />
                          {getVehicleLabel(js.vehicle_type)}
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center mt-8">
            <div className="bg-blue-100 p-6 rounded-full mb-4 text-blue-500">
              <Search className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-medium text-blue-800">No jobseekers found</h3>
            <p className="text-blue-600 mt-2">Try adjusting your filters</p>
            <button
              onClick={resetFilters}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-600 transition-colors shadow-md"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchDB
