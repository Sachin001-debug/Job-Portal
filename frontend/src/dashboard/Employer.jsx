import React, { useState, useEffect } from "react";
import axios from "axios";
import LogoImg from "../assets/user-img.jpg";
import {
  Briefcase,
  FileText,
  BarChart2,
  Settings,
  SearchIcon,
  User,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { DummyTopCandidates } from "../assets/assests";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DisplayRoleBased from "../shared/DisplayRoleBased";

const Employer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const API = import.meta.env.VITE_API;
  const Base_API = import.meta.env.VITE_URL;
  const navigate = useNavigate();

  // Fetch user data
  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(`${API}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = res.data.user;
      setUser(userData);

      // Set profile image preview
      if (userData.profileImage) {
        const cleanPath = userData.profileImage.replace(/^\/+/, '');
        const fullImageUrl = `${Base_API}/${cleanPath}`;
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logout Successful!");
  };

  const menuItems = [
    {
      label: "Post a Job",
      icon: <Briefcase size={18} />,
      path: "/dashboard/employer/postjob",
    },
    {
      label: "Manage Applications",
      icon: <FileText size={18} />,
      path: "/dashboard/employer/applications",
    },
    {
      label: "View Analytics",
      icon: <BarChart2 size={18} />,
      path: "/dashboard/employer/analytics",
    },
    { label: "Profile", icon: <User size={18} />, path: "/profile" },
  ];

  return (
    <>
      <nav className="flex items-center justify-between bg-white p-4 shadow-md border-b border-gray-200">
        {/* Left: Title */}
        <div className="flex gap-4 items-center">
          <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap">
            Hire Nepal
          </h1>

          {/* Hamburger Icon - Visible on mobile */}
          <button
            className="md:hidden block"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Center: Menu Items with icons - Desktop */}
        <ul className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => navigate(item.path)}
              className="flex items-center gap-1 hover:text-purple-600 cursor-pointer"
            >
              {item.icon}
              {item.label}
            </li>
          ))}
        </ul>

        {/* Right Side - Logout and Profile Image */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="flex gap-1 justify-center items-center hover:text-red-400 cursor-pointer"
          >
            <LogOut size={17} />
            <span className="hidden sm:inline">logout</span>
          </button>
          
          <div className="flex items-center gap-3 cursor-pointer">
            <img
              src={imagePreview || LogoImg}
              alt="Profile"
              className="w-10 h-10 rounded-full border border-gray-300 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = LogoImg;
              }}
              onClick={() => navigate("/profile")}
            />
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] bg-white z-50 shadow-lg">
          <ul className="flex flex-col gap-4 p-6 text-gray-700 font-medium">
            {menuItems.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 p-3 hover:bg-purple-50 rounded-lg cursor-pointer transition-colors"
              >
                {item.icon}
                {item.label}
              </li>
            ))}
            <hr className="my-2" />
            <li
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-3 p-3 hover:bg-red-50 text-red-600 rounded-lg cursor-pointer transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      )}

      <section className="p-4 bg-blue-100 min-h-[300px] flex flex-col md:flex-row items-center justify-around gap-6 md:gap-0">
        {/* Welcome Message */}
        <div className="w-full md:w-[40%] text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
            Welcome To Employer Dashboard, {user?.name?.split(' ')[0] || 'User'}!
          </h2>
          <p className="text-sm md:text-base text-gray-600 px-4 md:px-0">
            Manage your job postings, review applications, and track analytics
            all in one place.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[40%] flex flex-col gap-4 px-4 md:px-0">
          {/* Search Box */}
          <div className="flex items-center border border-gray-400 rounded-lg overflow-hidden bg-white">
            <input
              type="text"
              placeholder="Search people..."
              className="flex-1 p-2 md:p-3 outline-none text-sm md:text-base"
            />
            <button className="bg-purple-500 px-3 md:px-4 py-2 md:py-3 flex items-center justify-center hover:bg-purple-600 transition">
              <SearchIcon size={18} className="text-white md:w-5 md:h-5" />
            </button>
          </div>

          {/* Job Roles List */}
          <ul className="rounded-lg p-3 flex flex-wrap gap-2 text-gray-700 justify-center md:justify-start">
            <li className="px-2 md:px-3 py-1 border border-purple-500 text-purple-600 rounded-full cursor-pointer hover:bg-purple-500 hover:text-white transition duration-300 text-xs md:text-sm">
              Software Engineer
            </li>
            <li className="px-2 md:px-3 py-1 border border-purple-500 text-purple-600 rounded-full cursor-pointer hover:bg-purple-500 hover:text-white transition duration-300 text-xs md:text-sm">
              Product Manager
            </li>
            <li className="px-2 md:px-3 py-1 border border-purple-500 text-purple-600 rounded-full cursor-pointer hover:bg-purple-500 hover:text-white transition duration-300 text-xs md:text-sm">
              Data Analyst
            </li>
            <li className="px-2 md:px-3 py-1 border border-purple-500 text-purple-600 rounded-full cursor-pointer hover:bg-purple-500 hover:text-white transition duration-300 text-xs md:text-sm">
              Freelancer
            </li>
            <li className="px-2 md:px-3 py-1 border border-purple-500 text-purple-600 rounded-full cursor-pointer hover:bg-purple-500 hover:text-white transition duration-300 text-xs md:text-sm">
              Designer
            </li>
          </ul>
        </div>
      </section>

      {/* Top Candidates Section */}
      <DisplayRoleBased />
    </>
  );
};

export default Employer;