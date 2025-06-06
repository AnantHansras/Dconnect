


"use client"
import React, { useEffect, useState } from "react"
import { MapPin, Clock, Car, Search, Filter, X, ArrowRight,Briefcase,VenetianMask, User } from "lucide-react"
import {fetchJobSeekers} from '../services/jobseekerAPI'
import { useNavigate } from "react-router-dom"
export default function SearchDB() {
  const [jobSeekers, setJobSeekers] = useState([])
  const [searchLocation, setSearchLocation] = useState("")
  const [vehicleFilter, setVehicleFilter] = useState("all")

  const [filteredJobSeekers, setFilteredJobSeekers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
 const getJobTypeLabel = (jobType) => {
  const jobTypeOptions = [
    { value: "Bike Delivery", label: "Bike Delivery" },
    { value: "Van Driver", label: "Van Driver" },
    { value: "Auto Driver", label: "Auto Driver" },
    { value: "Cab/Taxi Driver", label: "Cab Driver" },
    { value: "Tempo/Truck Driver", label: "Truck Driver" },
    { value: "Any available opportunity", label: "Other" },
  ];

  const option = jobTypeOptions.find((opt) => opt.value === jobType);
  return option ? option.label : jobType;
};


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
    const matchLocation = searchLocation ? js.city.toLowerCase().includes(searchLocation.toLowerCase()) : true;
    const matchVehicle = vehicleFilter !== "all" ? js.vehicle_type === vehicleFilter : true;
    const matchJobType = jobTypeFilter !== "all" ? js.job_type === jobTypeFilter : true;
    return matchLocation && matchVehicle && matchJobType;
  });
  setFilteredJobSeekers(filtered);
}, [searchLocation, vehicleFilter, jobTypeFilter, jobSeekers]);


  const handleNavigate = (jobSeeker) => {
    // Replace with React Router navigation in real app
    navigate('/profile')
  }

  const resetFilters = () => {
  setSearchLocation("");
  setVehicleFilter("all");
  setJobTypeFilter("all");
};

const jobTypeOptions = [
  { value: "Bike Delivery", label: "Bike Delivery" },
  { value: "Van Driver", label: "Van Driver" },
  { value: "Auto Driver", label: "Auto Driver" },
  { value: "Cab/Taxi Driver", label: "Cab/Taxi Driver" },
  { value: "Tempo/Truck Driver", label: "Tempo/Truck Driver" },
  { value: "Any available opportunity", label: "Other" },
];

  const getVehicleLabel = (vehicleFilter) => {
    if (vehicleFilter == "No") return "Does Not Own Vehicle"
    return "Owns Vehicle"
  }
  const getVehicleLabel2 = (js) => {
    if (js.vehicle_type == "No") return "No vehicle"
    return js.vehicle
  }


  const getActiveFiltersCount = () => {
  let count = 0;
  if (vehicleFilter !== "all") count++;
  if (jobTypeFilter !== "all") count++;
  return count;
};
  const vehicleOptions = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ]

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Find Job Seekers</h1>
              <p className="text-gray-600 mt-1">Discover talented professionals in your area</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{filteredJobSeekers.length} candidates found</span>
            </div>
          </div>
        </div>
      </div>

      <div className=" mx-auto px-8 py-6">
        <div className="grid lg:grid-cols-[300px_1fr] gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                  </CardTitle>
                  {(vehicleFilter !== "all" || jobTypeFilter !== "all" || searchLocation) && (
  <Button variant="ghost" size="sm" onClick={resetFilters}>
    Clear All
  </Button>
)}

                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Location Search */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </Label>
                  <div className="relative">
                   
                    <Input
                      placeholder="Search by city, state..."
                      className="pl-10"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      
                    />
                    {searchLocation && (
                      <button
                        onClick={() => setSearchLocation("")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label="Clear location"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Vehicle Type Filter (Radio) */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Car className="h-4 w-4" />
                    Vehicle Type
                  </Label>
                  <div className="space-y-2">
                    {vehicleOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`vehicle-${option.value}`}
                          checked={vehicleFilter === option.value}
                          onChange={() => setVehicleFilter(option.value)}
                          className="form-radio accent-blue-600"
                        />
                        <Label htmlFor={`vehicle-${option.value}`} className="text-sm font-normal">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                

{/* Job Type Filter (Radio) */}
<div className="space-y-3">
  <Label className="text-sm font-medium flex items-center gap-2">
    <Briefcase className="h-4 w-4" />
    Job Type
  </Label>
  <div className="space-y-2">
    {jobTypeOptions.map((option) => (
      <div key={option.value} className="flex items-center space-x-2">
        <input
          type="radio"
          id={`job-${option.value}`}
          checked={jobTypeFilter === option.value}
          onChange={() => setJobTypeFilter(option.value)}
          className="form-radio accent-blue-600"
        />
        <Label htmlFor={`job-${option.value}`} className="text-sm font-normal">
          {option.label}
        </Label>
      </div>
    ))}
  </div>
</div>

              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-4">
            {/* Mobile Search and Filter */}
            <div className="lg:hidden">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  
                  <Input
                    placeholder="Search by location..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10"
                  />
                  {searchLocation && (
                    <button
                      onClick={() => setSearchLocation("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label="Clear location"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <Button variant="outline" size="icon" onClick={() => setIsFilterOpen(true)} className="relative bg-black text-white">
                  <Filter className="h-4 w-4" />
                  {getActiveFiltersCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-violet-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getActiveFiltersCount()}
                    </span>
                  )}
                </Button>
              </div>
            </div>

            {/* Active Filters Display */}
            {(vehicleFilter !== "all"  || jobTypeFilter !== "all") && (
              <div className="flex gap-2 flex-wrap">
                {vehicleFilter !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Car className="h-3 w-3" />
                    {getVehicleLabel(vehicleFilter)}
                    <button onClick={() => setVehicleFilter("all")} className="ml-1 hover:text-red-600" aria-label="Clear vehicle filter">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {jobTypeFilter !== "all" && (
      <Badge variant="secondary" className="flex items-center gap-1">
        <Briefcase className="h-3 w-3" />
        {getJobTypeLabel(jobTypeFilter)}
        <button onClick={() => setJobTypeFilter("all")} className="ml-1 hover:text-red-600" aria-label="Clear job type filter">
          <X className="h-3 w-3" />
        </button>
      </Badge>
    )}
              </div>
            )}

            {/* Job Seekers Grid */}
            {isLoading ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 bg-gray-200 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4" />
                          <div className="h-3 bg-gray-200 rounded w-1/2" />
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-full" />
                        <div className="h-3 bg-gray-200 rounded w-2/3" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredJobSeekers.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="text-center">
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
                    <p className="text-gray-500 mb-4">Try adjusting your filters to see more results.</p>
                    <Button onClick={resetFilters}>Reset Filters</Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredJobSeekers.map((js) => (
                  <Card
                    key={js._id}
                    onClick={() => {
    navigate('/profile', {
      state: {
        jobSeekerId: js._id,
        name: js.name,
        phone: js.phone,
        city: js.city,
        age: js.age,
        job_type: js.job_type,
        prior_exp:js.prior_exp,
        //job_type_1: js.job_type_1,
        experience: js.experience,
        //work_time: js.work_time,
        //job_need: js.job_need,
        gender:js.gender,
        vehicle: js.vehicle,
        job_timing:js.job_timing,
        //profile_pic: js.profile_pic,
        email: js.email,
        vehicle_type: js.vehicle_type
      }
    });
  }}
                    className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    <CardContent className="p-0">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16 ">
                          {/* <AvatarImage src={js.profile_pic || "/placeholder.svg"} alt={js.name} /> */}
                          <AvatarFallback>
                            {js.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">{js.name}</h3>
                          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{js.city}</span>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400" />
                      </div>

                      <div className="mt-2 space-y-3">
                      <div className="flex gap-1">
                      <div className="flex items-center gap-1">
                          <Briefcase className="h-6 w-6 text-indigo-400 bg-indigo-100 rounded-full p-1" />
                          <span className="text-sm text-gray-600">{getJobTypeLabel(js.job_type)}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Car className="h-6 w-6 text-indigo-400 bg-indigo-100 rounded-full p-1" />
                          <span className="text-sm text-gray-600">{getVehicleLabel2(js)}</span>
                        </div></div>
                        

                        {/* {js.job_need && (
                          <div className="pt-1">
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                js.job_need.toLowerCase().includes("immediately")
                                  ? "border-green-200 text-green-700 bg-green-50"
                                  : js.job_need.toLowerCase().includes("within 1 week")
                                    ? "border-yellow-200 text-yellow-700 bg-yellow-50"
                                    : "border-blue-200 text-blue-700 bg-blue-50"
                              }`}
                            >
                              {formatJobNeedStatus(js.job_need)}
                            </Badge>
                          </div>
                        )} */}

                        <div className="pt-1">
                          <Button className="w-full" size="sm" onClick={() => {
    navigate('/profile', {
      state: {
        jobSeekerId: js._id,
        name: js.name,
        phone: js.phone,
        city: js.city,
        age: js.age,
        job_type: js.job_type,
        prior_exp:js.prior_exp,
        //job_type_1: js.job_type_1,
        experience: js.experience,
        //work_time: js.work_time,
        //job_need: js.job_need,
        gender:js.gender,
        vehicle: js.vehicle,
        job_timing:js.job_timing,
        //profile_pic: js.profile_pic,
        email: js.email,
        vehicle_type: js.vehicle_type
      }
    });
  }}>
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isFilterOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-end">
          <div className="bg-white w-[300px] sm:w-[400px] h-full shadow-xl overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </h3>
                <Button variant="ghost" size="icon" onClick={() => setIsFilterOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Vehicle Type */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Car className="h-4 w-4" />
                    Vehicle Type
                  </Label>
                  <div className="space-y-2">
                    {vehicleOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`mobile-vehicle-${option.value}`}
                          checked={vehicleFilter === option.value}
                          onChange={() => setVehicleFilter(option.value)}
                          className="form-radio accent-blue-600"
                        />
                        <Label htmlFor={`mobile-vehicle-${option.value}`} className="text-sm font-normal">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                

{/* Job Type */}
<div className="space-y-3">
  <Label className="text-sm font-medium flex items-center gap-2">
    <Briefcase className="h-4 w-4" />
    Job Type
  </Label>
  <div className="space-y-2">
    {jobTypeOptions.map((option) => (
      <div key={option.value} className="flex items-center space-x-2">
        <input
          type="radio"
          id={`mobile-job-${option.value}`}
          checked={jobTypeFilter === option.value}
          onChange={() => setJobTypeFilter(option.value)}
          className="form-radio accent-blue-600"
        />
        <Label htmlFor={`mobile-job-${option.value}`} className="text-sm font-normal">
          {option.label}
        </Label>
      </div>
    ))}
  </div>
</div>

                <div className="pt-4 space-y-3">
                  <Button variant="outline" className="w-full" onClick={resetFilters}>
                    Reset All Filters
                  </Button>
                  <Button className="w-full" onClick={() => setIsFilterOpen(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


export const Input = React.forwardRef((props, ref) => (
  <input
    ref={ref}
    style={{
      padding: "12px 16px",
      borderRadius: "8px",
      border: "2px solid #e2e8f0",
      width: "100%",
      fontSize: "14px",
      fontFamily: "system-ui, -apple-system, sans-serif",
      backgroundColor: "#ffffff",
      transition: "all 0.2s ease-in-out",
      outline: "none",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    }}
    onFocus={(e) => {
      e.target.style.borderColor = "#3b82f6"
      e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)"
      props.onFocus?.(e)
    }}
    onBlur={(e) => {
      e.target.style.borderColor = "#e2e8f0"
      e.target.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)"
      props.onBlur?.(e)
    }}
    {...props}
  />
))
Input.displayName = "Input"

export const Button = React.forwardRef((props, ref) => (
  <button
    ref={ref}
    style={{
      padding: "12px 24px",
      backgroundColor: "#8b5cf6", // violet-600
      color: "#ffffff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      fontFamily: "system-ui, -apple-system, sans-serif",
      transition: "all 0.2s ease-in-out",
      boxShadow: "0 2px 4px rgba(139, 92, 246, 0.2)", // violet shadow
      outline: "none",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "44px",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = "#6d28d9"; // violet-700
      e.currentTarget.style.transform = "translateY(-1px)";
      e.currentTarget.style.boxShadow = "0 4px 8px rgba(109, 40, 217, 0.3)"; // stronger violet shadow
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = "#8b5cf6"; // violet-600
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 2px 4px rgba(139, 92, 246, 0.2)";
    }}
    onFocus={(e) => {
      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.4)"; // violet focus ring
      props.onFocus?.(e);
    }}
    onBlur={(e) => {
      e.currentTarget.style.boxShadow = "0 2px 4px rgba(139, 92, 246, 0.2)";
      props.onBlur?.(e);
    }}
    {...props}
  />
));
Button.displayName = "Button";


export const Card = ({ children, ...props }) => (
  <div
    style={{
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "24px",
      maxWidth: "400px",
      width: "100%",
      margin: "auto",
      backgroundColor: "#ffffff",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)",
      transition: "all 0.2s ease-in-out",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)"
      e.currentTarget.style.transform = "translateY(-2px)"
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)"
      e.currentTarget.style.transform = "translateY(0)"
    }}
    {...props}
  >
    {children}
  </div>
)

export const CardHeader = ({ children, ...props }) => (
  <div style={{ marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid #f1f5f9" }} {...props}>
    {children}
  </div>
)

export const CardTitle = ({ children, ...props }) => (
  <h3
    style={{
      fontSize: "1.25rem",
      fontWeight: "700",
      margin: 0,
      color: "#1e293b",
      fontFamily: "system-ui, -apple-system, sans-serif",
      lineHeight: "1.4",
    }}
    {...props}
  >
    {children}
  </h3>
)

export const CardContent = ({ children, ...props }) => (
  <div style={{ color: "#475569", lineHeight: "1.6" }} {...props}>
    {children}
  </div>
)

export const Badge = ({ children, variant = "default", ...props }) => {
  const variants = {
    default: { bg: "#f1f5f9", color: "#475569", border: "#e2e8f0" },
    success: { bg: "#dcfce7", color: "#166534", border: "#bbf7d0" },
    warning: { bg: "#fef3c7", color: "#92400e", border: "#fde68a" },
    error: { bg: "#fee2e2", color: "#dc2626", border: "#fecaca" },
  }

  const style = variants[variant] || variants.default // Safe fallback

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 12px",
        backgroundColor: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
        borderRadius: "16px",
        fontSize: "12px",
        fontWeight: "600",
        fontFamily: "system-ui, -apple-system, sans-serif",
        textTransform: "uppercase",
        letterSpacing: "0.025em",
      }}
      {...props}
    >
      {children}
    </span>
  )
}


export const Checkbox = React.forwardRef((props, ref) => (
  <input
    type="checkbox"
    ref={ref}
    style={{
      width: "18px",
      height: "18px",
      accentColor: "#3b82f6",
      cursor: "pointer",
      borderRadius: "4px",
    }}
    {...props}
  />
))
Checkbox.displayName = "Checkbox"

export const Label = ({ htmlFor, children, ...props }) => (
  <label
    htmlFor={htmlFor}
    style={{
      fontSize: "14px",
      fontWeight: "600",
      color: "#374151",
      fontFamily: "system-ui, -apple-system, sans-serif",
      cursor: "pointer",
      display: "block",
      marginBottom: "6px",
    }}
    {...props}
  >
    {children}
  </label>
)

export const Separator = (props) => (
  <hr
    style={{
      margin: "24px 0",
      border: "none",
      height: "1px",
      backgroundColor: "#e2e8f0",
      opacity: 0.6,
    }}
    {...props}
  />
)

export const Avatar = ({ children, size = "lg", ...props }) => {
  const sizes = {
    sm: "32px",
    md: "40px",
    lg: "56px",
  }

  return (
    <div
      style={{
        width: sizes[size],
        height: sizes[size],
        borderRadius: "50%",
        overflow: "hidden",
        backgroundColor: "#e2e8f0",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid #ffffff",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export const AvatarImage = ({ src, alt, ...props }) => (
  <img
    src={src || "/placeholder.svg"}
    alt={alt}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.2s ease-in-out",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.05)"
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)"
    }}
    {...props}
  />
)

const colors = [
  "#636666", // gray (default)
  "#F87171", // red
  "#60A5FA", // blue
  "#34D399", // green
  "#FBBF24", // yellow
  "#A78BFA", // purple
];

function getColorFromName(name) {
  if (!name) return colors[0];
  const charCodesSum = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[charCodesSum % colors.length];
}

export const AvatarFallback = ({ children, ...props }) => {
  // children might be initials string
  // or you can pass name explicitly as a prop, better practice:
  // e.g. <AvatarFallback name={js.name} />
  const name = typeof children === "string" ? children : "";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "700",
        color: "#ffffff",
        backgroundColor: getColorFromName(name),
        fontSize: "18px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
      {...props}
    >
      {children}
    </div>
  );
};


