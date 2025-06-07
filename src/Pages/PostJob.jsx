
"use client";
import  { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion,AnimatePresence  } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { postJob } from "../services/jobAPI";
import {
  MapPinIcon,
  BriefcaseIcon,
  UsersIcon,
  IndianRupee,
} from "lucide-react";

const formSchema = z
  .object({
    companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
    location: z.string().min(2, { message: "Location is required." }),
    jobType: z.enum([
      "Bike Delivery",
        "Van Driver",
        "Auto Driver",
        "Cab/Taxi Driver",
        "Tempo/Truck Driver",
        "Other",
    ]),
    numberOfPeople: z.coerce.number().int().positive({ message: "Please enter a positive number." }),
    companyPhone: z.string().min(1, { message: "Phone" }),
    expectedSalary: z.string().min(1, { message: "Expected salary is required." }),
    work_time: z.enum([
      "Morning (6 AM – 12 PM)",
      "Afternoon (12 PM – 6 PM)",
      "Evening (6 PM – 10 PM)",
      "Night (10 PM – 6 AM)",
      "Flexible/Any time",
    ]),
    minAge: z.coerce.number().int().min(16, { message: "Minimum age must be at least 16." }),
    maxAge: z.coerce.number().int().min(16, { message: "Maximum age must be at least 16." }),
    requirements: z.string().min(10, { message: "Job requirements must be at least 10 characters." }),
  })
  .refine((data) => data.maxAge >= data.minAge, {
    message: "Maximum age must be greater than or equal to minimum age",
    path: ["maxAge"],
  });
const companyPhone1 = sessionStorage.getItem("companyPhone");
export default function PostJob() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      location: "",
      jobType: "Bike Delivery",
      numberOfPeople: 1,
      companyPhone:companyPhone1,
      expectedSalary: "",
      work_time: "Morning (6 AM – 12 PM)",
      minAge: 18,
      maxAge: 65,
      requirements: "",
    },
  });

  const [showCheck, setShowCheck] = useState(false);
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log(data);
      await postJob(data);
      reset();
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
      setShowCheck(true);
      setTimeout(() => setShowCheck(false), 1500);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 sm:px-6 lg:px-8 pt-24">
  <div className="text-center mb-10">
    <h1 className="text-4xl font-bold text-gray-900 mb-2">Post a Job</h1>
    <p className="text-md text-gray-500">Fill out the form to hire workers for your company</p>
  </div>

  <form
    onSubmit={handleSubmit(onSubmit)}
    className="bg-[var(--background)] rounded-3xl border border-t-4 border-violet-500 shadow-lg p-8 space-y-8 "
  >
    {/* Company & Location */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <InputField label="Company Name" icon={<BriefcaseIcon className="w-5 h-5 text-indigo-500" />} {...register("companyName")} error={errors.companyName?.message} placeholder="e.g. Acme Inc." />
      <InputField label="Location" icon={<MapPinIcon className="w-5 h-5 text-indigo-500" />} {...register("location")} error={errors.location?.message} placeholder="e.g. Malviya Nagar,Jaipur" />
    </div>

    {/* Job Type & People Needed */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      
      <InputField label="Expected Salary" icon={<IndianRupee className="w-5 h-5 text-indigo-500" />} {...register("expectedSalary")} error={errors.expectedSalary?.message} placeholder="e.g. ₹15,000/month" />
      <InputField label="Number of People Needed" type="number" icon={<UsersIcon className="w-5 h-5 text-indigo-500" />} {...register("numberOfPeople")} error={errors.numberOfPeople?.message} min="1" />
    </div>

    {/* Salary & Work Time */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <SelectField label="Job Type" options={[
        "Bike Delivery",
        "Van Driver",
        "Auto Driver",
        "Cab/Taxi Driver",
        "Tempo/Truck Driver",
        "Other",
      ]} {...register("jobType")} error={errors.jobType?.message} />
      <SelectField label="Work Time" options={[
        "Morning (6 AM – 12 PM)",
        "Afternoon (12 PM – 6 PM)",
        "Evening (6 PM – 10 PM)",
        "Night (10 PM – 6 AM)",
        "Flexible/Any time",
      ]} {...register("work_time")} error={errors.work_time?.message} />
    </div>

    {/* Age Range */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <InputField label="Minimum Age" type="number" {...register("minAge")} error={errors.minAge?.message} min="16" />
      <InputField label="Maximum Age" type="number" {...register("maxAge")} error={errors.maxAge?.message} min="16" />
    </div>

    {/* Description & Requirements */}
    <TextAreaField label="Job Requirements" {...register("requirements")} error={errors.requirements?.message} placeholder="Qualifications, experience..." />

    {/* Submit Button */}
    <div className="flex justify-end">
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-all disabled:opacity-50"
      >
        {isSubmitting ? "Processing..." : "Post Job"}
      </button>
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
  </form>
</div>

  );
}

// InputField
const InputField = ({ label, icon, error, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>}
      <input
        className={`w-full ${icon ? "pl-10" : "pl-3"} pr-3 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        } transition`}
        {...props}
      />
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// SelectField
const SelectField = ({ label, options, error, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      className={`w-full px-3 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        error ? "border-red-500" : "border-gray-300"
      } transition`}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// TextAreaField
const TextAreaField = ({ label, error, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      className={`w-full px-3 py-2 border rounded-lg bg-white shadow-sm resize-none min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        error ? "border-red-500" : "border-gray-300"
      } transition`}
      {...props}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);
