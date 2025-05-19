import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FileText, Search, Briefcase } from "lucide-react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import SVGGraphic from "../assets/landing.svg";
import SVGGraphic1 from "../assets/jobSeeker.svg";
import SVGGraphic2 from "../assets/company.svg";
export default function Landing({ userType }) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[var(--background)] text-[var(--foreground)]">
      <section className="min-h-screen flex-1 md:p-8 flex flex-col justify-center items-center text-center bg-[var(--background)]">
        <motion.div
          className="w-64 h-64 -mb-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {userType === null && (
            <>
              <img
                src={SVGGraphic}
                alt="Illustration"
                className="w-full h-full object-contain"
              />
            </>
          )}
          {userType === "jobSeeker" && (
            <>
              <img
                src={SVGGraphic1}
                alt="Illustration"
                className="w-full h-full object-contain"
              />
            </>
          )}
          {userType === "company" && (
            <>
              <img
                src={SVGGraphic2}
                alt="Illustration"
                className="w-full h-full object-contain"
              />
            </>
          )}
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-4 flex flex-wrap justify-center gap-2"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Connecting{" "}
          <TypeAnimation
            sequence={["Talent", 2000, "Careers", 2000, "Dreams", 2000]}
            speed={50}
            repeat={Infinity}
            className="text-[#4A90E2]"
          />
          to Opportunity Instantly
        </motion.h2>

        <motion.p
          className="text-[var(--muted-foreground)] max-w-md mb-8 text-lg px-8"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          DConnect is a smart, WhatsApp-based platform that bridges the gap
          between job seekers and employers in real-time.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {userType === null && (
            <>
              <motion.a
                href="/authseeker"
                className="bg-[var(--background)] mx-auto w-fit hover:scale-110 duration-200 border border-[#4A90E2] text-[var(--primary)] px-6 py-3 rounded-full font-semibold shadow-lg flex items-center gap-2"
              >
                <Search className="w-5 h-5" /> Find a Job
              </motion.a>
              <motion.a
                href="/auth"
                className="bg-[#4A90E2] text-white hover:scale-110 duration-200 px-6 py-3 rounded-full font-semibold shadow-lg flex items-center gap-2"
              >
                <Briefcase className="w-5 h-5" /> Hire Now
              </motion.a>
            </>
          )}

          {userType === "jobSeeker" && (
            <>
              <motion.a
                href="/google-form"
                className="bg-[var(--background)] mx-auto w-fit hover:scale-110 duration-200 border border-[#4A90E2] text-[var(--primary)] px-6 py-3 rounded-full font-semibold shadow-lg flex items-center gap-2"
              >
                <FileText className="w-5 h-5" /> Fill Details
              </motion.a>
              <motion.a
                href="/available_posts"
                className="bg-[#4A90E2] hover:scale-110 duration-200 text-white px-6 py-3 rounded-full font-semibold shadow-lg flex items-center gap-2"
              >
                <Briefcase className="w-5 h-5" /> Available Jobs
              </motion.a>
            </>
          )}

          {userType === "company" && (
            <>
              <motion.a
                href="/postjob"
                className="bg-[var(--background)] w-fit mx-auto hover:scale-110 duration-200 border border-[#4A90E2] text-[var(--primary)] px-6 py-3 rounded-full font-semibold shadow-lg flex items-center gap-2"
              >
                <Briefcase className="w-5 h-5" /> Post Job
              </motion.a>
              <motion.a
                href="/SearchDB"
                className="bg-[#4A90E2] hover:scale-110 duration-200 text-white px-6 py-3 rounded-full font-semibold shadow-lg flex items-center gap-2"
              >
                <Search className="w-5 h-5" /> Search Jobseekers
              </motion.a>
            </>
          )}
        </motion.div>
      </section>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
}
