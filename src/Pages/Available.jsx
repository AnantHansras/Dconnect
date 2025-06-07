"use client"

import { useState, useMemo,useEffect } from "react"
import { Search, MapPin, Clock, Users,IndianRupee, Calendar, DollarSign, Filter } from "lucide-react"
import { fetchAllJobs } from "../services/jobAPI"


// Mock data based on the job schema
const mockJobs = [
  {
    _id: "1",
    companyName: "QuickBite Restaurants",
    location: "Mumbai, Maharashtra",
    jobType: "Delivery Boy (Zomato, Swiggy, etc.)",
    numberOfPeople: 5,
    expectedSalary: "₹15,000 - ₹20,000",
    work_time: "Morning (6 AM – 12 PM)",
    startDate: new Date("2024-02-01"),
    minAge: 18,
    maxAge: 35,
    description:
      "Join our team as a delivery partner for popular food delivery platforms. Flexible working hours with competitive pay and incentives.",
    requirements:
      "Own vehicle (bike/scooter), valid driving license, smartphone, good knowledge of local area, punctual and reliable.",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    _id: "2",
    companyName: "City Cab Services",
    location: "Delhi, NCR",
    jobType: "Driver (Cab, Auto, Private)",
    numberOfPeople: 10,
    expectedSalary: "₹25,000 - ₹35,000",
    work_time: "Flexible/Any time",
    startDate: new Date("2024-01-25"),
    minAge: 21,
    maxAge: 50,
    description:
      "Experienced drivers needed for our expanding cab service. Work with leading ride-sharing platforms and earn attractive incentives.",
    requirements:
      "Valid commercial driving license, clean driving record, own vehicle preferred, good communication skills, knowledge of GPS navigation.",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    _id: "3",
    companyName: "MegaMart Warehouse",
    location: "Bangalore, Karnataka",
    jobType: "Helper (Shop, Warehouse, etc.)",
    numberOfPeople: 15,
    expectedSalary: "₹12,000 - ₹18,000",
    work_time: "Afternoon (12 PM – 6 PM)",
    startDate: new Date("2024-02-05"),
    minAge: 18,
    maxAge: 45,
    description:
      "Warehouse helpers needed for inventory management, packing, and general warehouse operations. Great opportunity for steady employment.",
    requirements:
      "Physical fitness, ability to lift heavy items, basic literacy, willingness to work in shifts, team player attitude.",
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    _id: "4",
    companyName: "TechSolutions Marketing",
    location: "Pune, Maharashtra",
    jobType: "Sales/Marketing (In-store, promotions)",
    numberOfPeople: 8,
    expectedSalary: "₹18,000 - ₹25,000",
    work_time: "Evening (6 PM – 10 PM)",
    startDate: new Date("2024-01-30"),
    minAge: 20,
    maxAge: 40,
    description:
      "Dynamic sales representatives needed for product promotions and in-store marketing activities. Performance-based incentives available.",
    requirements:
      "Good communication skills, presentable appearance, sales experience preferred, energetic personality, ability to work weekends.",
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-08"),
  },
  {
    _id: "5",
    companyName: "Urban Logistics",
    location: "Chennai, Tamil Nadu",
    jobType: "Other (please specify)",
    numberOfPeople: 3,
    expectedSalary: "₹20,000 - ₹30,000",
    work_time: "Night (10 PM – 6 AM)",
    startDate: new Date("2024-02-10"),
    minAge: 22,
    maxAge: 35,
    description:
      "Night shift supervisors needed for logistics operations. Responsible for coordinating deliveries and managing warehouse activities during night hours.",
    requirements:
      "Previous supervisory experience, ability to work night shifts, good organizational skills, basic computer knowledge, leadership qualities.",
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-14"),
  },
  {
    _id: "6",
    companyName: "Green Grocers",
    location: "Hyderabad, Telangana",
    jobType: "Helper (Shop, Warehouse, etc.)",
    numberOfPeople: 6,
    expectedSalary: "₹14,000 - ₹19,000",
    work_time: "Morning (6 AM – 12 PM)",
    startDate: new Date("2024-01-28"),
    minAge: 18,
    maxAge: 40,
    description:
      "Shop helpers needed for fresh produce handling, customer service, and maintaining store cleanliness. Great working environment with growth opportunities.",
    requirements:
      "Customer service skills, physical stamina, basic math skills, hygiene consciousness, willingness to learn, punctuality.",
    createdAt: new Date("2024-01-11"),
    updatedAt: new Date("2024-01-11"),
  },
]

const jobTypes = [
  "Bike Delivery",
  "Van Driver",
  "Auto Driver",
  "Cab/Taxi Driver",
  "Tempo/Truck Driver",
  "Other",
]

const workTimes = [
  "All Times",
  "Morning (6 AM – 12 PM)",
  "Afternoon (12 PM – 6 PM)",
  "Evening (6 PM – 10 PM)",
  "Night (10 PM – 6 AM)",
  "Flexible/Any time",
]

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedJobType, setSelectedJobType] = useState("All Types")
  const [selectedWorkTime, setSelectedWorkTime] = useState("All Times")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [showFilters, setShowFilters] = useState(false)
   const [jobs, setJobs] = useState([])
    useEffect(() => {
    const fetchFilteredJobs = async () => {
      try {
        const response = await fetchAllJobs()
        
        setJobs(response.data)
      } catch (error) {
        console.error("Error fetching jobs:", error)
      }
    }

    fetchFilteredJobs()
  }, [])
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesJobType = selectedJobType === "All Types" || job.jobType === selectedJobType
      const matchesWorkTime = selectedWorkTime === "All Times" || job.work_time === selectedWorkTime
      const matchesLocation = !selectedLocation || job.location.toLowerCase().includes(selectedLocation.toLowerCase())

      return matchesSearch && matchesJobType && matchesWorkTime && matchesLocation
    })
  }, [jobs, searchTerm, selectedJobType, selectedWorkTime, selectedLocation])

const formatDate = (date) => {
  const d = new Date(date); // ensure it's a Date object
  if (isNaN(d)) return "Invalid Date"; // optional safety check

  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};


const getJobTypeColor = (jobType) => {
  const colors = {
    "Bike Delivery": "bg-orange-100 text-orange-800",
    "Van Driver": "bg-blue-100 text-blue-800",
    "Auto Driver": "bg-purple-100 text-purple-800",
    "Tempo/Truck Driver": "bg-green-100 text-green-800",
    "Cab/Taxi Driver": "bg-purple-100 text-purple-800",
    "Other": "bg-gray-100 text-gray-800",
  };
  return colors[jobType] || "bg-gray-100 text-gray-800";
};
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Jobs</h1>
            <p className="text-gray-600">Find your next opportunity from {jobs.length} available positions</p>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            {/* Search Bar and Filter Toggle */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search companies,locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-base w-full"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 px-4 flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">{showFilters ? "Hide Filters" : "Filters"}</span>
                {(selectedJobType !== "All Types" || selectedWorkTime !== "All Times" || selectedLocation) && (
                  <Badge
                    variant="secondary"
                    className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {
                      [
                        selectedJobType !== "All Types",
                        selectedWorkTime !== "All Times",
                        selectedLocation !== "",
                      ].filter(Boolean).length
                    }
                  </Badge>
                )}
              </Button>
            </div>

            {/* Collapsible Filters */}
            {showFilters && (
              <div className="space-y-3 animate-in slide-in-from-top-2 duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type} className="text-base py-3">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedWorkTime} onValueChange={setSelectedWorkTime}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Work Time" />
                    </SelectTrigger>
                    <SelectContent>
                      {workTimes.map((time) => (
                        <SelectItem key={time} value={time} className="text-base py-3">
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters Button */}
                {(selectedJobType !== "All Types" || selectedWorkTime !== "All Times" || selectedLocation) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedJobType("All Types")
                      setSelectedWorkTime("All Times")
                      setSelectedLocation("")
                    }}
                    className="w-full sm:w-auto"
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <Card key={job._id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-semibold text-gray-900 mb-2">{job.companyName}</CardTitle>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                  </div>
                  <Badge className={getJobTypeColor(job.jobType)}>{job.jobType}</Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <IndianRupee className="h-4 w-4 mr-2 text-green-600" />
                      <span>{job.expectedSalary}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-blue-600" />
                      <span>{job.numberOfPeople} positions</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-purple-600" />
                      <span>{job.work_time}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                      <span>
                        Age: {job.minAge} - {job.maxAge} years
                      </span>
                      <span>Posted: {formatDate(job.createdAt)}</span>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{job.requirements}</p>
                    </div>

                    <Button className="w-full">Apply Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

const Input = ({ className, ...props }) => (
  <input
    className={`border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

const Button = ({ children, className, ...props }) => (
  <button
    className={`bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700 transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Badge = ({ children, className, variant }) => {
  const baseStyle =
    variant === "secondary"
      ? "bg-gray-200 text-gray-700"
      : "bg-blue-100 text-blue-800";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${baseStyle} ${className}`}
    >
      {children}
    </span>
  );
};

const Card = ({ children, className }) => (
  <div className={`bg-white rounded-xl border p-5 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => <div className="mb-4">{children}</div>;
const CardTitle = ({ children, className }) => (
  <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>
);
const CardContent = ({ children }) => <div>{children}</div>;

// Select Components
const Select = ({ value, onValueChange, children }) => (
  <select
    value={value}
    onChange={(e) => onValueChange(e.target.value)}
    className="w-full border border-gray-300 rounded-md h-12 px-3 text-base"
  >
    {children}
  </select>
);
const SelectTrigger = ({ children }) => <>{children}</>;
const SelectValue = ({ placeholder }) => (
  <option value="">{placeholder}</option>
);
const SelectContent = ({ children }) => <>{children}</>;
const SelectItem = ({ children, value, className }) => (
  <option value={value} className={className}>
    {children}
  </option>
);