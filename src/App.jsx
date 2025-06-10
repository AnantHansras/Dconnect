import { useState,useEffect } from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {  Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion'
import Navbar from './Components/Navbar';
import Landing from './Pages/Landing'
import Contact from './Pages/Contact'
import About from './Pages/About'
import SearchDB from './Pages/SearchDB'
import AuthPage from './Pages/AuthPage';
import AuthPageSeeker from './Pages/AuthPageSeeker';
import PostJob from './Pages/PostJob';
import Available from './Pages/Available';
import Profile from './Pages/Profile';
import AllConnections from './Pages/AllConnetions';
import Application from './Pages/Applications';
function App() {
  const [userType, setUserType] = useState(null);
  useEffect(() => {
    const handleStorageChange = () => {
      const user = sessionStorage.getItem("userType");
      setUserType(user || null);
    };

    // Update userType on component mount
    handleStorageChange();

    // Listen for storage changes
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <>
      {/* Navbar with fade-in */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Navbar userType={userType} setUserType={setUserType} />
      </motion.div>
      <Routes>
        <Route  path="/" element={<Landing userType={userType}/>} />
        <Route path="/auth" element={<AuthPage/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/authseeker" element={<AuthPageSeeker/>} />
        <Route path="/postJob"  element={<PostJob/>}/>
        <Route path="/available_posts"  element={<Available/>}/>
        <Route path="/contact" element={<Contact/>}  />
        <Route path="/about" element={<About/>}  />
        <Route path="/searchdb" element={<SearchDB/>}  />
        <Route path="/allconnections" element={<AllConnections/>}  />
        <Route path="/applications" element={<Application/>}  />
      </Routes>
    
    </>
  )
}

export default App
