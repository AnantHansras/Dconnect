import React, { useState, useEffect } from "react";
import { Menu, Briefcase, X, Info, Mail, Home, Search, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Navbar({userType,setUserType}) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    console.log("userType", userType);
  }, [userType]);

  const handleLogout = () => {
    sessionStorage.removeItem("userType");
    setUserType(null)
    navigate("/");
    setMenuOpen(false)
  };

  const renderLink = (to, icon, label) => (
    <Link key={label} to={to} className="hover:text-[#4A90E2] cursor-pointer flex items-center gap-1">
      {icon} {label}
    </Link>
  );

  const renderMobileLink = (to, icon, label) => (
    <Link
      to={to}
      onClick={() => setMenuOpen(false)}
      className="flex items-center gap-2"
    >
      {icon} {label}
    </Link>
  );

  // const getLinks = () => {
  //   if (userType === "company") {
  //     return [
  //       renderLink("/SearchDB", <Search className="w-4 h-4" />, "Search"),
  //       renderLink("/postJob", <Briefcase className="w-4 h-4" />, "Post-Job"),
  //     ];
  //   }
  //   if (userType === "jobSeeker") {
  //     return [
  //       renderLink("/available", <User className="w-4 h-4" />, "Available-Jobs"),
  //     ];
  //   }
  //   return [renderLink("/", <Home className="w-4 h-4" />, "Home")];
  // };
  const isAdmin = sessionStorage.getItem("isAdmin") === "yes";
  return (
    <nav className="bg-[var(--secondary)] text-[var(--foreground)] shadow-md fixed w-full z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold text-[var(--primary)]">Dconnect</div>

          <div className="hidden md:flex space-x-6 font-medium">
          {
            isAdmin && renderLink("/allconnections", <Connection className="w-4 h-4" />, "All Connections")
          }
            {renderLink("/", <Home className="w-4 h-4" />, "Home")}
            {renderLink("/about", <Info className="w-4 h-4" />, "About")}
            {renderLink("/contact", <Mail className="w-4 h-4" />, "Contact Us")}
            {userType && (
              <button onClick={handleLogout} className="flex items-center gap-1 hover:text-[#4A90E2]">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col space-y-2 text-sm font-medium bg-[var(--secondary)]">
          {renderMobileLink("/", <Home className="w-4 h-4" />, "Home")}
          {renderMobileLink("/about", <Info className="w-4 h-4" />, "About")}
          {renderMobileLink("/contact", <Mail className="w-4 h-4" />, "Contact Us")}
          {userType && (
            <button onClick={handleLogout} className="flex items-center gap-2 hover:text-[#4A90E2]">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
