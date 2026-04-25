import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  FileText,
  User,
  Settings,
  LogOut,
  Menu,
  SearchIcon,
  X,
  DonutIcon,
  File,
} from "lucide-react";
import BannerImg from "../assets/banner-job-seeker.webp";
import { employersLogos } from "../assets/assests";
import JobSeekerTopJobs from "../components/JobSeekerTopJobs";
import TrainingCards from "../components/TrainingCards";
import Footer from "../components/Footer";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import DisplayRoleBased from "../shared/DisplayRoleBased";

const JoobSeeker = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const API = import.meta.env.VITE_API;
  const Base_API = import.meta.env.VITE_URL;

  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(`${API}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = res.data.user;
      setUser(userData);

      // Fixed: Proper image URL construction
      if (userData.profileImage) {
        // Remove leading slashes to prevent double slashes
        const cleanPath = userData.profileImage.replace(/^\/+/, '');
        const fullImageUrl = `${Base_API}/${cleanPath}`;
        console.log("Setting image preview:", fullImageUrl); // For debugging
        setImagePreview(fullImageUrl);
      } else {
        setImagePreview(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logout Successful");
  };

  const menuItems = [
    {
      label: "Jobs",
      icon: <Briefcase size={18} />,
      path: "/dashboard/jobseeker/jobs",
    },
    {
      label: "Applications",
      icon: <FileText size={18} />,
      path: "/dashboard/jobseeker/application",
    },
    { label: "Profile", icon: <User size={18} />, path: "/profile" },
    {
      label: "Resume",
      icon: <File size={18} />,
      path: "/dashboard/jobseeker/resume-form",
    },
  ];

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 py-3 bg-white text-white shadow-[0_2px_10px_rgba(0,0,0,0.3)] border-b border-gray-100">
        {/* Logo and Hamburger Section */}
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-black text-xl md:text-2xl whitespace-nowrap">
            HireNepal
          </h1>

          {/* Hamburger Icon - Mobile */}
          <button
            className="lg:hidden block"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X size={24} className="text-black" />
            ) : (
              <Menu size={24} className="text-black" />
            )}
          </button>
        </div>

        {/* Menu Items - Desktop */}
        <ul className="hidden text-black lg:flex items-center gap-6 text-sm">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => navigate(item.path)}
              className="flex text-lg items-center gap-2 font-medium cursor-pointer hover:text-purple-400"
            >
              {item.icon} {item.label}
            </li>
          ))}
        </ul>

        {/* Right Side - Fixed with proper image display */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <li
            onClick={logoutHandler}
            className="flex text-lg text-black font-medium gap-2 justify-center items-center text-sm cursor-pointer hover:text-red-400 list-none"
          >
            <LogOut size={16} className="cursor-pointer" />
            <span className="hidden sm:inline">Logout</span>
          </li>
          <div
            onClick={() => navigate("/dashboard/jobseeker/display/resume-form")}
            className="flex-shrink-0 cursor-pointer"
          >
            <img
              src={imagePreview || "/default-avatar.png"}
              className="w-9 h-9 rounded-full border border-gray-500 object-cover"
              alt="user"
              onError={(e) => {
                // Fallback to default avatar if image fails to load
                e.target.onerror = null;
                e.target.src = "/default-avatar.png";
              }}
            />
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[57px] bg-white z-50 shadow-lg">
          <ul className="flex flex-col gap-4 p-6">
            {menuItems.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 p-3 hover:bg-purple-50 rounded-lg cursor-pointer text-black"
              >
                {item.icon}
                <span className="text-lg">{item.label}</span>
              </li>
            ))}
            <hr className="my-2" />
            <li
              onClick={() => {
                logoutHandler();
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-3 p-3 hover:bg-red-50 text-red-600 rounded-lg cursor-pointer"
            >
              <LogOut size={18} />
              <span className="text-lg">Logout</span>
            </li>
          </ul>
        </div>
      )}

      {/* Hero Banner */}
      <section className="w-full flex flex-col md:flex-row bg-[rgba(235,245,255,1)] p-4 md:p-6 lg:p-8 gap-6 md:gap-12 items-center">
        {/* Left Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src={BannerImg}
            alt="Banner"
            className="w-[200px] h-[160px] sm:w-[280px] sm:h-[220px] md:w-[360px] md:h-[300px] rounded-lg"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center md:ml-12 text-center md:text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Start Your Journey Today,
            {user ? (
              <span className="text-xl sm:text-2xl md:text-3xl text-blue-800 block md:inline">
                {" "}
                {user.name}
              </span>
            ) : (
              <span>Loading...</span>
            )}
          </h1>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
            <li
              onClick={() => navigate("/dashboard/jobseeker/jobs")}
              className="flex items-center gap-2 text-base sm:text-lg font-medium cursor-pointer hover:text-blue-600 list-none"
            >
              <div className="p-2 bg-purple-500 text-white rounded-full flex items-center justify-center shadow-[0_4px_6px_rgba(128,0,128,0.4)]">
                <Briefcase size={16} />
              </div>
              Jobs
            </li>

            <li
              onClick={() => navigate("/dashboard/jobseeker/application")}
              className="flex items-center gap-2 text-base sm:text-lg font-medium cursor-pointer hover:text-blue-600 list-none"
            >
              <div className="p-2 bg-purple-500 text-white rounded-full flex items-center justify-center shadow-[0_4px_6px_rgba(128,0,128,0.4)]">
                <FileText size={16} />
              </div>
              Applications
            </li>

            <li
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 text-base sm:text-lg font-medium cursor-pointer hover:text-blue-600 list-none"
            >
              <div className="p-2 bg-purple-500 text-white rounded-full flex items-center justify-center shadow-[0_4px_6px_rgba(128,0,128,0.4)]">
                <User size={16} />
              </div>
              Profile
            </li>
          </div>

          {/* Search */}
          <div className="relative mt-6 w-full max-w-[400px] mx-auto md:mx-0">
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full p-2 pr-14 border border-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-blue-700"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-500 p-2 w-[50px] sm:w-[60px] rounded-lg cursor-pointer text-white flex items-center justify-center">
              <SearchIcon size={18} />
            </div>
          </div>

          {/* Tags */}
          <ul className="flex flex-wrap justify-center md:justify-start gap-2 mt-4 text-xs sm:text-sm">
            <li className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full cursor-pointer hover:bg-blue-200 whitespace-nowrap">
              All Jobs
            </li>
            <li className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full cursor-pointer hover:bg-blue-200 whitespace-nowrap">
              Jobs by Function
            </li>
            <li className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full cursor-pointer hover:bg-blue-200 whitespace-nowrap">
              Jobs by Location
            </li>
            <li className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full cursor-pointer hover:bg-blue-200 whitespace-nowrap">
              Remote Jobs
            </li>
            <li className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full cursor-pointer hover:bg-blue-200 whitespace-nowrap">
              Jobs by Industry
            </li>
          </ul>
        </div>
      </section>

      {/* Top employers banner */}
      <div className="flex items-center bg-gray-200 shadow-md shadow-purple-200 p-3 gap-3 sm:gap-6 overflow-hidden">
        {/* Title */}
        <div className="w-[150px] sm:w-[200px] shrink-0">
          <h1 className="text-base sm:text-xl ml-2 font-semibold">
            Top Employers
          </h1>
        </div>

        {/* Animated Logos */}
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-6 sm:gap-10 animate-scroll whitespace-nowrap w-max">
            {/* FIRST SET */}
            {employersLogos.map((logo, index) => (
              <img
                key={`first-${index}`}
                src={logo}
                alt="employer"
                className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] rounded-full object-cover shrink-0"
              />
            ))}

            {/* SECOND SET */}
            {employersLogos.map((logo, index) => (
              <img
                key={`second-${index}`}
                src={logo}
                alt="employer"
                className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] rounded-full object-cover shrink-0"
              />
            ))}

            {/* Third set */}
            {employersLogos.map((logo, index) => (
              <img
                key={`third-${index}`}
                src={logo}
                alt="employer"
                className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] rounded-full object-cover shrink-0"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <DisplayRoleBased />
      <TrainingCards />
      <Footer />
    </>
  );
};

export default JoobSeeker;