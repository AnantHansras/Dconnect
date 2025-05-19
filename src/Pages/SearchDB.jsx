import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchJobSeekers } from "../services/jobSeekerAPI";
import { MapPin, Clock, Car, User } from "lucide-react";

const SearchDB = () => {
  const navigate = useNavigate();
  const [jobSeekers, setJobSeekers] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [vehicleFilter, setVehicleFilter] = useState("");
  const [workTimeFilter, setWorkTimeFilter] = useState("");
  const [filteredJobSeekers, setFilteredJobSeekers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const getAllJobSeekers = async () => {
      setIsLoading(true);
      try {
        const data = await fetchJobSeekers();
        if (data && data.data) {
          setJobSeekers(data.data);
          setFilteredJobSeekers(data.data);
        }
      } catch (error) {
        console.error("Error fetching job seekers:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllJobSeekers();
  }, []);

  useEffect(() => {
    const filtered = jobSeekers.filter((js) => {
      const matchLocation = searchLocation ? js.city.toLowerCase().includes(searchLocation.toLowerCase()) : true;
      const matchVehicle = vehicleFilter ? js.vehicle_type === vehicleFilter : true;
      const matchWorkTime = workTimeFilter ? js.work_time === workTimeFilter : true;

      return matchLocation && matchVehicle && matchWorkTime;
    });
    setFilteredJobSeekers(filtered);
  }, [searchLocation, vehicleFilter, workTimeFilter, jobSeekers]);

  const handleNavigate = (jobSeeker) => {
    navigate(`/profile`, {
      state: {
        jobSeekerId: jobSeeker._id,
        name: jobSeeker.name,
        phone: jobSeeker.phone,
        city: jobSeeker.city,
        age: jobSeeker.age,
        job_type: jobSeeker.job_type,
        vehicle_type: jobSeeker.vehicle_type,
        experience: jobSeeker.experience,
        work_time: jobSeeker.work_time,
        job_need: jobSeeker.job_need,
        vehicle: jobSeeker.vehicle,
        job_type_1: jobSeeker.job_type_1,
        profile: jobSeeker.profile,
        email: jobSeeker.email,
      },
    });
  };

  const resetFilters = () => {
    setSearchLocation("");
    setVehicleFilter("");
    setWorkTimeFilter("");
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 ">
      <div className="sticky top-0 z-10 bg-white shadow-sm p-4 pt-24">
        <h2 className="text-xl font-bold mb-3 text-center">Find Jobseekers</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by location..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring focus:ring-blue-500"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Filters
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white p-4 border-t border-b">
          <div className="mb-4">
            <label>Vehicle Type</label>
            <select
              value={vehicleFilter}
              onChange={(e) => setVehicleFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            >
              <option value="">All Vehicle Types</option>
              <option value="Yes – Personal bike (for deliveries)">Bike</option>
              <option value="Yes – Personal vehicle (Car, Auto, etc.)">Car/Auto</option>
              <option value="No – I'm looking for jobs that don't require a vehicle">No Vehicle</option>
            </select>
          </div>

          <div className="mb-4">
            <label>Work Time</label>
            <select
              value={workTimeFilter}
              onChange={(e) => setWorkTimeFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            >
              <option value="">All Work Times</option>
              <option value="Morning (6 AM – 12 PM)">Morning</option>
              <option value="Afternoon (12 PM – 6 PM)">Afternoon</option>
              <option value="Evening (6 PM – 10 PM)">Evening</option>
              <option value="Night (10 PM – 6 AM)">Night</option>
              <option value="Flexible/Any time">Flexible</option>
            </select>
          </div>

          <button onClick={resetFilters} className="px-4 py-2 bg-gray-300 rounded-lg">
            Reset Filters
          </button>
        </div>
      )}

      <div className="p-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : filteredJobSeekers.length > 0 ? (
          <div className="grid gap-4">
            {filteredJobSeekers.map((js) => (
              <div
  key={js._id}
  className="bg-white p-6 border border-gray-100 shadow-lg rounded-2xl flex items-center gap-6 cursor-pointer hover:bg-gray-50 transition duration-300"
  onClick={() => handleNavigate(js)}
>
  <img
    src={"https://www.w3schools.com/w3images/avatar2.png"}
    alt="Profile"
    className="w-16 h-16 rounded-full border border-gray-200 object-cover"
  />
  <div>
    <h3 className="font-semibold flex items-center gap-3 text-lg">
      <User className="w-5 h-5 text-gray-500" /> {js.name}
    </h3>
    <p className="text-sm flex items-center gap-2 text-gray-600">
      <MapPin className="w-5 h-5 text-gray-400" /> {js.city}
    </p>
    <p className="text-sm flex items-center gap-2 text-gray-600">
      <Clock className="w-5 h-5 text-gray-400" /> {
    js.work_time.includes('Morning') ? 'Morning' :
    js.vehicle_type.includes('Night') ? 'Night' :
    js.work_time.includes('Afternoon') ? 'Afternoon' :
    js.vehicle_type.includes('Evening') ? 'Evening' : js.work_time
  }
    </p>
    <p className="text-sm flex items-center gap-2 text-gray-600">
  <Car className="w-5 h-5 text-gray-400" /> {
    js.vehicle_type.includes('bike') ? 'Bike' :
    js.vehicle_type.includes('vehicle') ? 'Vehicle' :
    js.vehicle_type.includes('No') ? 'No Vehicle' : js.vehicle_type
  }
</p>

  </div>
</div>

            ))}
          </div>
        ) : (
          <div>No jobseekers found</div>
        )}
      </div>
    </div>
  );
};

export default SearchDB;
