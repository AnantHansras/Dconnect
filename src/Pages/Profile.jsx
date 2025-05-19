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
  UserCheck,
} from "lucide-react"

const Profile = () => {
  const { state } = useLocation()
  const {
    jobSeekerId,
    name,
    phone,
    city,
    age,
    job_type,
    vehicle_type,
    experience,
    work_time,
    job_need,
    vehicle,
    profile,
    email,
  } = state || {}

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="w-full max-w-md">
        <button
          className="mb-4 text-gray-600 hover:text-gray-900 flex items-center"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-center">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-md flex items-center justify-center">
                {profile ? (
                  <img src={profile} alt={name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-xl font-bold text-blue-600">{getInitials(name)}</span>
                )}
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mt-2">{name}</h2>
            <span className="bg-blue-400/20 text-white text-sm py-1 px-3 rounded-full">
              ID: {jobSeekerId}
            </span>
          </div>

          <div className="p-6 space-y-6">
            <div className="space-y-3">
              <h3 className="text-gray-500 font-semibold">Contact Information</h3>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-500 mr-3" />
                <span>{email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-blue-500 mr-3" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-blue-500 mr-3" />
                <span>{city}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-gray-500 font-semibold">Personal Details</h3>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-blue-500 mr-3" />
                <span>{age}</span>
              </div>
              <div className="flex items-center">
                <Heart className="w-5 h-5 text-blue-500 mr-3" />
                <span>{job_need}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-gray-500 font-semibold">Professional Details</h3>
              <div className="flex items-center">
                <Briefcase className="w-5 h-5 text-blue-500 mr-3" />
                <span>{job_type}</span>
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 text-blue-500 mr-3" />
                <span>{experience}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-blue-500 mr-3" />
                <span>{work_time}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-gray-500 font-semibold">Transportation</h3>
              <div className="flex items-center">
                <Car className="w-5 h-5 text-blue-500 mr-3" />
                <span>{vehicle_type}</span>
              </div>
              <div className="flex items-center">
                <UserCheck className="w-5 h-5 text-blue-500 mr-3" />
                <span>{vehicle}</span>
              </div>
            </div>
          </div>

          <div className="p-6 border-t">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center">
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
