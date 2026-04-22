import React, { useState } from "react";
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

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logout Successfull!");
  };

  const navigate = useNavigate();

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
        <div className="flex gap-4">
          <h1 className="text-xl font-bold text-gray-800">Hire Nepal</h1>

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

        <div className="flex gap-4 justify-center">
          <div className="flex gap-1 justify-center items-center hover:text-red-400">
            <LogOut size={17} className="" />
            <button onClick={handleLogout} className="cursor-pointer">
              logout
            </button>
          </div>
          <div className="flex items-center gap-3">
            <img
              src={LogoImg}
              alt="Profile"
              className="w-10 h-10 rounded-full border border-gray-300"
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
              Logout
            </li>
          </ul>
        </div>
      )}

      <section className="p-4 bg-blue-100 min-h-[300px] flex flex-col md:flex-row items-center justify-around gap-6 md:gap-0">
        {/* Welcome Message */}
        <div className="w-full md:w-[40%] text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
            Welcome To Employer Dashboard!
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
