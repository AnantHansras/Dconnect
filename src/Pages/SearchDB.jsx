// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { fetchJobSeekers } from "../services/jobseekerAPI";
// import { MapPin, Clock, Car, Search, Filter, X, ArrowRight } from "lucide-react";

// const SearchDB = () => {
//   const navigate = useNavigate();
//   const [jobSeekers, setJobSeekers] = useState([]);
//   const [searchLocation, setSearchLocation] = useState("");
//   const [vehicleFilter, setVehicleFilter] = useState("all");
//   const [workTimeFilter, setWorkTimeFilter] = useState("all");
//   const [filteredJobSeekers, setFilteredJobSeekers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

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
//       const matchLocation = searchLocation
//         ? js.city.toLowerCase().includes(searchLocation.toLowerCase())
//         : true;
//       const matchVehicle = vehicleFilter !== "all" ? js.vehicle_type === vehicleFilter : true;
//       const matchWorkTime = workTimeFilter !== "all" ? js.work_time === workTimeFilter : true;

//       return matchLocation && matchVehicle && matchWorkTime;
//     });
//     setFilteredJobSeekers(filtered);
//   }, [searchLocation, vehicleFilter, workTimeFilter, jobSeekers]);

//   const handleNavigate = (jobSeeker) => {
//     navigate(`/profile`, { state: { ...jobSeeker } });
//   };

//   const resetFilters = () => {
//     setSearchLocation("");
//     setVehicleFilter("all");
//     setWorkTimeFilter("all");
//   };

//   const getVehicleLabel = (vehicleType) => {
//     if (vehicleType.includes("bike")) return "Bike";
//     if (vehicleType.includes("vehicle")) return "Vehicle";
//     if (vehicleType.includes("No")) return "No Vehicle";
//     return vehicleType;
//   };

//   const getWorkTimeLabel = (workTime) => {
//     if (workTime.includes("Morning")) return "Morning";
//     if (workTime.includes("Night")) return "Night";
//     if (workTime.includes("Afternoon")) return "Afternoon";
//     if (workTime.includes("Evening")) return "Evening";
//     return workTime;
//   };

//   const getActiveFiltersCount = () => {
//     let count = 0;
//     if (vehicleFilter !== "all") count++;
//     if (workTimeFilter !== "all") count++;
//     return count;
//   };

//   return (
//     <div className="w-full min-h-screen bg-slate-50 flex flex-col lg:flex-row">
//       {/* Sidebar Filters for Desktop */}
//       <aside className="hidden lg:block w-full max-w-xs bg-white border-r border-blue-100 h-screen sticky top-0 p-6">
//         <h3 className="text-xl font-semibold text-blue-800 mb-6">Filters</h3>
//         <div className="space-y-6">
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-blue-700">Vehicle Type</label>
//             <select
//               value={vehicleFilter}
//               onChange={(e) => setVehicleFilter(e.target.value)}
//               className="w-full px-4 py-3 border border-blue-100 rounded-lg bg-white text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
//             >
//               <option value="all">All Vehicle Types</option>
//               <option value="Yes – Personal bike (for deliveries)">Bike</option>
//               <option value="Yes – Personal vehicle (Car, Auto, etc.)">Car/Auto</option>
//               <option value="No – I'm looking for jobs that don't require a vehicle">No Vehicle</option>
//             </select>
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-medium text-blue-700">Work Time</label>
//             <select
//               value={workTimeFilter}
//               onChange={(e) => setWorkTimeFilter(e.target.value)}
//               className="w-full px-4 py-3 border border-blue-100 rounded-lg bg-white text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
//             >
//               <option value="all">All Work Times</option>
//               <option value="Morning (6 AM – 12 PM)">Morning</option>
//               <option value="Afternoon (12 PM – 6 PM)">Afternoon</option>
//               <option value="Evening (6 PM – 10 PM)">Evening</option>
//               <option value="Night (10 PM – 6 AM)">Night</option>
//               <option value="Flexible/Any time">Flexible</option>
//             </select>
//           </div>

//           <button
//             onClick={resetFilters}
//             className="w-full py-3 border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 transition"
//           >
//             Reset All Filters
//           </button>
//         </div>
//       </aside>

//       {/* Main content */}
//       <main className="flex-1 p-4 pt-20 pb-20 lg:pb-10">
//         <div className="sticky top-0 z-10 bg-slate-50 pb-4">
//           <h2 className="text-2xl font-bold mb-5 text-center text-black">Find Jobseekers</h2>
//           <div className="flex items-center gap-2 max-w-xl mx-auto">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
//               <input
//                 type="text"
//                 placeholder="Search by location..."
//                 value={searchLocation}
//                 onChange={(e) => setSearchLocation(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border-0 rounded-xl bg-white ring-1 ring-blue-300 focus:ring-2 focus:ring-blue-300 transition shadow-sm"
//               />
//               {searchLocation && (
//                 <button
//                   onClick={() => setSearchLocation("")}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600"
//                 >
//                   <X className="h-4 w-4" />
//                 </button>
//               )}
//             </div>
//             <button
//               onClick={() => setIsFilterOpen(true)}
//               className="lg:hidden h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center hover:bg-blue-50 transition filter-button relative"
//             >
//               <Filter className="h-5 w-5 text-blue-500" />
//               {getActiveFiltersCount() > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-blue-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                   {getActiveFiltersCount()}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile filter modal */}
//         {isFilterOpen && (
//           <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-end">
//             <div className="filter-sheet bg-white w-[300px] sm:w-[400px] h-full shadow-xl overflow-auto p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-semibold text-blue-800">Filters</h3>
//                 <button
//                   onClick={() => setIsFilterOpen(false)}
//                   className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-blue-50 text-blue-500"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>
//               {/* Same filters as sidebar */}
//               <div className="space-y-6">
//                 {/* Vehicle Filter */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-blue-700">Vehicle Type</label>
//                   <select
//                     value={vehicleFilter}
//                     onChange={(e) => setVehicleFilter(e.target.value)}
//                     className="w-full px-4 py-3 border border-blue-100 rounded-lg bg-white text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   >
//                     <option value="all">All Vehicle Types</option>
//                     <option value="Yes – Personal bike (for deliveries)">Bike</option>
//                     <option value="Yes – Personal vehicle (Car, Auto, etc.)">Car/Auto</option>
//                     <option value="No – I'm looking for jobs that don't require a vehicle">No Vehicle</option>
//                   </select>
//                 </div>

//                 {/* Work Time Filter */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-blue-700">Work Time</label>
//                   <select
//                     value={workTimeFilter}
//                     onChange={(e) => setWorkTimeFilter(e.target.value)}
//                     className="w-full px-4 py-3 border border-blue-100 rounded-lg bg-white text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   >
//                     <option value="all">All Work Times</option>
//                     <option value="Morning (6 AM – 12 PM)">Morning</option>
//                     <option value="Afternoon (12 PM – 6 PM)">Afternoon</option>
//                     <option value="Evening (6 PM – 10 PM)">Evening</option>
//                     <option value="Night (10 PM – 6 AM)">Night</option>
//                     <option value="Flexible/Any time">Flexible</option>
//                   </select>
//                 </div>

//                 <button
//                   onClick={resetFilters}
//                   className="w-full py-3 border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 transition"
//                 >
//                   Reset All Filters
//                 </button>
//                 <button
//                   onClick={() => setIsFilterOpen(false)}
//                   className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
//                 >
//                   Apply Filters
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Filter tags */}
//         {(vehicleFilter !== "all" || workTimeFilter !== "all") && (
//           <div className="flex gap-2 mt-4 flex-wrap justify-center lg:justify-start">
//             {vehicleFilter !== "all" && (
//               <div className="px-3 py-1 bg-white rounded-full shadow-sm flex items-center gap-1 text-sm">
//                 <Car className="h-3 w-3 text-blue-500" />
//                 <span className="text-blue-800">{getVehicleLabel(vehicleFilter)}</span>
//                 <button onClick={() => setVehicleFilter("all")} className="text-blue-400 hover:text-blue-600">
//                   <X className="h-3 w-3" />
//                 </button>
//               </div>
//             )}
//             {workTimeFilter !== "all" && (
//               <div className="px-3 py-1 bg-white rounded-full shadow-sm flex items-center gap-1 text-sm">
//                 <Clock className="h-3 w-3 text-blue-500" />
//                 <span className="text-blue-800">{getWorkTimeLabel(workTimeFilter)}</span>
//                 <button onClick={() => setWorkTimeFilter("all")} className="text-blue-400 hover:text-blue-600">
//                   <X className="h-3 w-3" />
//                 </button>
//               </div>
//             )}
//             <button onClick={resetFilters} className="text-sm underline text-blue-600">
//               Clear all
//             </button>
//           </div>
//         )}

//         {/* Job Seeker Results */}
//         <div className="mt-6 space-y-4 max-w-xl mx-auto">
//           {isLoading ? (
//             <div className="space-y-4">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="bg-white rounded-xl p-4 shadow animate-pulse">
//                   <div className="flex gap-4 items-center">
//                     <div className="h-16 w-16 bg-blue-100 rounded-full" />
//                     <div className="flex-1 space-y-2">
//                       <div className="w-3/4 h-4 bg-blue-100 rounded" />
//                       <div className="w-1/2 h-4 bg-blue-100 rounded" />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : filteredJobSeekers.length > 0 ? (
//             filteredJobSeekers.map((js) => (
//               <div
//                 key={js._id}
//                 onClick={() => handleNavigate(js)}
//                 className="bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer transition transform hover:-translate-y-1"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="h-16 w-16 rounded-full overflow-hidden bg-blue-50 border-2 border-blue-200">
//                     <img
//                       src={js.profile_pic}
//                       alt={js.name}
//                       className="h-full w-full object-cover"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(js.name)}&background=dbeafe&color=1e40af`;
//                       }}
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex justify-between items-start">
//                       <h3 className="text-lg font-semibold text-blue-900">{js.name}</h3>
//                       <ArrowRight className="h-5 w-5 text-blue-500" />
//                     </div>
//                     <p className="text-sm text-blue-700 flex items-center gap-1 mt-1">
//                       <MapPin className="w-4 h-4" /> {js.city}
//                     </p>
//                     <div className="mt-2 flex gap-2 flex-wrap">
//                       <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center gap-1">
//                         <Clock className="w-3 h-3" />
//                         {getWorkTimeLabel(js.work_time)}
//                       </div>
//                       <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center gap-1">
//                         <Car className="w-3 h-3" />
//                         {getVehicleLabel(js.vehicle_type)}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center mt-10 text-blue-600">
//               <Search className="h-10 w-10 mx-auto mb-2" />
//               <h3 className="text-xl font-medium">No jobseekers found</h3>
//               <p className="mt-2">Try adjusting your filters.</p>
//               <button
//                 onClick={resetFilters}
//                 className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//               >
//                 Reset Filters
//               </button>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default SearchDB;

"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchJobSeekers } from "../services/jobseekerAPI"
import { MapPin, Clock, Car, Search, Filter, X, ArrowRight, UserRound, Briefcase } from "lucide-react"

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
    navigate(`/profile`, { state: { ...jobSeeker } })
  }

  const resetFilters = () => {
    setSearchLocation("")
    setVehicleFilter("all")
    setWorkTimeFilter("all")
  }

  const getVehicleLabel = (vehicleType) => {
    if (vehicleType.includes("bike")) return "Bike"
    if (vehicleType.includes("vehicle")) return "Car/Auto"
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

  // Format job need status for display
  const formatJobNeedStatus = (status) => {
    if (!status) return "Unknown"
    if (status.includes("Immediately")) return "Available Now"
    if (status.includes("Within 1 week")) return "Available Soon"
    return "Exploring Options"
  }

  // Get availability color based on job need
  const getAvailabilityColor = (status) => {
    if (!status) return "bg-slate-500"
    if (status.includes("Immediately")) return "bg-green-500"
    if (status.includes("Within 1 week")) return "bg-yellow-500"
    return "bg-violet-500"
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="hidden pt-24 lg:block w-full max-w-xs bg-white border-r border-slate-200 h-screen sticky top-0 p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-violet-700 mb-6 flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </h3>
        <div className="space-y-6">
          {/* Vehicle Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Car className="h-4 w-4 text-violet-600" />
              Vehicle Type
            </label>
            <select
              value={vehicleFilter}
              onChange={(e) => setVehicleFilter(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-200"
            >
              <option value="all">All Vehicle Types</option>
              <option value="Yes – Personal bike (for deliveries)">Bike</option>
              <option value="Yes – Personal vehicle (Car, Auto, etc.)">Car/Auto</option>
              <option value="No – I'm looking for jobs that don't require a vehicle">No Vehicle</option>
            </select>
          </div>

          {/* Work Time */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Clock className="h-4 w-4 text-violet-600" />
              Work Time
            </label>
            <select
              value={workTimeFilter}
              onChange={(e) => setWorkTimeFilter(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-200"
            >
              <option value="all">All Work Times</option>
              <option value="Morning (6 AM – 12 PM)">Morning</option>
              <option value="Afternoon (12 PM – 6 PM)">Afternoon</option>
              <option value="Evening (6 PM – 10 PM)">Evening</option>
              <option value="Night (10 PM – 6 AM)">Night</option>
              <option value="Flexible/Any time">Flexible</option>
            </select>
          </div>

          <button
            onClick={resetFilters}
            className="w-full py-3 border border-slate-200 rounded-lg text-violet-600 hover:bg-violet-50 transition-all duration-200 font-medium flex items-center justify-center gap-2"
          >
            <X className="h-4 w-4" />
            Reset All Filters
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 pt-20 pb-20 lg:pb-10">
        <div className="sticky top-0 z-10 bg-gradient-to-b from-slate-50 to-transparent pb-4 pt-2">
          <h2 className="text-2xl font-bold mb-5 text-center text-slate-900">Find Jobseekers</h2>
          <div className="flex items-center gap-2 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by location..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-0 rounded-xl bg-white ring-1 ring-violet-200 focus:ring-2 focus:ring-violet-400 transition-all duration-200 shadow-sm placeholder-slate-400"
              />
              {searchLocation && (
                <button
                  onClick={() => setSearchLocation("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-violet-400 hover:text-violet-600 transition-colors duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center hover:bg-violet-50 transition-colors duration-200 relative"
            >
              <Filter className="h-5 w-5 text-violet-500" />
              {getActiveFiltersCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-violet-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getActiveFiltersCount()}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile filter modal */}
        {isFilterOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-end">
            <div className="bg-white w-[300px] sm:w-[400px] h-full shadow-xl overflow-auto p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-violet-700 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-violet-50 text-violet-500 transition-colors duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Filters */}
              <div className="space-y-6">
                {/* Vehicle Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Car className="h-4 w-4 text-violet-600" />
                    Vehicle Type
                  </label>
                  <select
                    value={vehicleFilter}
                    onChange={(e) => setVehicleFilter(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-200"
                  >
                    <option value="all">All Vehicle Types</option>
                    <option value="Yes – Personal bike (for deliveries)">Bike</option>
                    <option value="Yes – Personal vehicle (Car, Auto, etc.)">Car/Auto</option>
                    <option value="No – I'm looking for jobs that don't require a vehicle">No Vehicle</option>
                  </select>
                </div>

                {/* Work Time */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-violet-600" />
                    Work Time
                  </label>
                  <select
                    value={workTimeFilter}
                    onChange={(e) => setWorkTimeFilter(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-200"
                  >
                    <option value="all">All Work Times</option>
                    <option value="Morning (6 AM – 12 PM)">Morning</option>
                    <option value="Afternoon (12 PM – 6 PM)">Afternoon</option>
                    <option value="Evening (6 PM – 10 PM)">Evening</option>
                    <option value="Night (10 PM – 6 AM)">Night</option>
                    <option value="Flexible/Any time">Flexible</option>
                  </select>
                </div>

                <button
                  onClick={resetFilters}
                  className="w-full py-3 border border-slate-200 rounded-lg text-violet-600 hover:bg-violet-50 transition-all duration-200 font-medium flex items-center justify-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Reset All Filters
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full py-3 bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-lg hover:from-violet-600 hover:to-indigo-700 transition-colors duration-200 shadow-sm font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filter Tags */}
        {(vehicleFilter !== "all" || workTimeFilter !== "all") && (
          <div className="flex gap-2 mt-4 flex-wrap justify-center lg:justify-start">
            {vehicleFilter !== "all" && (
              <div className="px-3 py-1 bg-white border border-violet-100 rounded-full shadow-sm flex items-center gap-1 text-sm">
                <Car className="h-3 w-3 text-violet-500" />
                <span className="text-slate-800">{getVehicleLabel(vehicleFilter)}</span>
                <button
                  onClick={() => setVehicleFilter("all")}
                  className="text-violet-400 hover:text-violet-600 transition-colors duration-200"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            {workTimeFilter !== "all" && (
              <div className="px-3 py-1 bg-white border border-violet-100 rounded-full shadow-sm flex items-center gap-1 text-sm">
                <Clock className="h-3 w-3 text-violet-500" />
                <span className="text-slate-800">{getWorkTimeLabel(workTimeFilter)}</span>
                <button
                  onClick={() => setWorkTimeFilter("all")}
                  className="text-violet-400 hover:text-violet-600 transition-colors duration-200"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            <button
              onClick={resetFilters}
              className="text-sm underline text-violet-600 hover:text-violet-800 transition-colors duration-200"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Results */}
        <div className="mt-6 space-y-4 max-w-xl mx-auto">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow animate-pulse">
                  <div className="flex gap-4 items-center">
                    <div className="h-16 w-16 bg-violet-100 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="w-3/4 h-4 bg-violet-100 rounded" />
                      <div className="w-1/2 h-4 bg-violet-100 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredJobSeekers.length > 0 ? (
            filteredJobSeekers.map((js) => (
              <div
                key={js._id}
                onClick={() => handleNavigate(js)}
                className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 transform hover:-translate-y-1 border border-slate-100"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full overflow-hidden bg-violet-50 border-2 border-violet-200 flex items-center justify-center">
                      {js.profile_pic ? (
                        <img
                          src={js.profile_pic || "/placeholder.svg"}
                          alt={js.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              js.name,
                            )}&background=f5f3ff&color=7c3aed`
                          }}
                        />
                      ) : (
                        <UserRound className="h-8 w-8 text-violet-500" />
                      )}
                    </div>
                    
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-slate-900">{js.name}</h3>
                      <div className="bg-violet-50 p-1 rounded-full text-violet-600 hover:bg-violet-100 transition-colors duration-200">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4 text-violet-500" /> {js.city}
                    </p>
                    <div className="mt-2 flex gap-2 flex-wrap">
                      <div className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-xs flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3" />
                        {getWorkTimeLabel(js.work_time)}
                      </div>
                      <div className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-xs flex items-center gap-1 font-medium">
                        <Car className="w-3 h-3" />
                        {getVehicleLabel(js.vehicle_type)}
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center mt-10 text-violet-600 bg-white p-8 rounded-xl shadow-sm border border-slate-100">
              <Search className="h-10 w-10 mx-auto mb-2" />
              <h3 className="text-xl font-medium">No jobseekers found</h3>
              <p className="mt-2 text-slate-600">Try adjusting your filters.</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-lg hover:from-violet-600 hover:to-indigo-700 transition-colors duration-200 shadow-sm font-medium"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default SearchDB

