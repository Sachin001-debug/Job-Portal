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
} from "lucide-react";
import BannerImg from "../assets/banner-job-seeker.webp";
import userImg from "../assets/user-img.jpg";
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
  const API = import.meta.env.VITE_API;
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      const res = await axios.get(`${API}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const  logoutHandler = ()=>{
    const token = localStorage.getItem("token");

    localStorage.removeItem(token);
    navigate('/login')
   toast.success("Logout Successfull")
   
  }
  return (
    <>
      {/*Navbar */}
      <nav className="flex items-center justify-between px-4 py-3 bg-white text-white shadow-[0_2px_10px_rgba(0,0,0,0.3)] border-b border-gray-100">
        {/* Logo */}
        <h1 className="font-bold text-black text-xl md:text-2xl">HireNepal</h1>

        {/* Menu Items */}
        <ul className="hidden text-black lg:flex items-center gap-6 text-sm">
          <li onClick={() => navigate("/dashboard/jobseeker/jobs")} className="flex text-lg items-center gap-2 font-medium cursor-pointer hover:text-purple-400">
            <Briefcase size={18} /> Jobs
          </li>

          <li onClick={()=>navigate('/dashboard/jobseeker/application')} className="flex text-lg items-center gap-2 font-medium cursor-pointer hover:text-purple-400">
            <FileText size={18} /> Applications
          </li>

          <li
            onClick={() => navigate("/profile")}
            className="flex text-lg font-medium items-center gap-2 cursor-pointer hover:text-purple-400"
          >
            <User size={18} /> Profile
          </li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center mr-12 gap-3">
          <Menu
            size={24}
            className=" text-lg text-black block lg:hidden cursor-pointer"
          />
          <li onClick={logoutHandler} className="flex text-lg text-black font-medium gap-2 justify-center items-center text-sm cursor-pointer hover:text-red-400">
            <LogOut size={16} className="ml-4 cursor-pointer" />
            Logout
          </li>

          <img
            src={userImg}
            alt="User"
            className="w-9 h-9 rounded-full border border-gray-500"
          />
        </div>
      </nav>
      {/* Hero Banner */}
      <section className="w-full flex flex-col md:flex-row bg-[rgba(235,245,255,1)] p-6 md:p-8 gap-6 md:gap-12 items-center">
        {/* Left Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src={BannerImg}
            alt="Banner"
            className="w-[220px] h-[180px] sm:w-[280px] sm:h-[220px] md:w-[360px] md:h-[300px] rounded-lg"
          />
        </div>
        {/* Right Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center md:ml-12 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold">
            Start Your Journey Today,
            {user ? (
              <span className="text-3xl text-blue-800"> {user.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </h1>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
            <li onClick={()=>navigate('/dashboard/jobseeker/jobs')} className="flex items-center gap-2 text-lg font-medium cursor-pointer hover:text-blue-600">
              <div className="p-2 bg-purple-500 text-white rounded-full flex items-center justify-center shadow-[0_4px_6px_rgba(128,0,128,0.4)]">
                <Briefcase size={18} />
              </div>
              Jobs
            </li>

            <div className="flex items-center gap-2 text-lg font-medium cursor-pointer hover:text-blue-600">
              <div className="p-2 bg-purple-500 text-white rounded-full flex items-center justify-center shadow-[0_4px_6px_rgba(128,0,128,0.4)]">
                <FileText size={18} />
              </div>
              Applications
            </div>

            <div className="flex items-center gap-2 text-lg font-medium cursor-pointer hover:text-blue-600">
              <div className="p-2 bg-purple-500 text-white rounded-full flex items-center justify-center shadow-[0_4px_6px_rgba(128,0,128,0.4)]">
                <User size={18} />
              </div>
              Profile
            </div>
          </div>

          {/* Search */}
          <div className="relative mt-6 w-full max-w-[400px] mx-auto md:mx-0">
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full p-2 pr-14 border border-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-blue-700"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-500 p-2 w-[60px] rounded-lg cursor-pointer text-white flex items-center justify-center">
              <SearchIcon size={18} />
            </div>
          </div>

          {/* Tags */}
          <ul className="flex flex-wrap justify-center md:justify-start gap-2 mt-4 text-sm">
            <li className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full cursor-pointer hover:bg-blue-200">
              All Jobs
            </li>
            <li className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full cursor-pointer hover:bg-blue-200">
              Jobs by Function
            </li>
            <li className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full cursor-pointer hover:bg-blue-200">
              Jobs by Location
            </li>
            <li className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full cursor-pointer hover:bg-blue-200">
              Remote Jobs
            </li>
            <li className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full cursor-pointer hover:bg-blue-200">
              Jobs by Industry
            </li>
          </ul>
        </div>

        {/* Right Content */}
      </section>
      {/*Top employers banner */}

      <div className="flex items-center bg-gray-200 shadow-md shadow-purple-200 p-3 gap-6 overflow-hidden">
        {/* Title */}
        <div className="w-[200px] shrink-0">
          <h1 className="text-xl ml-2 font-semibold">Top Employers</h1>
        </div>

        {/* Animated Logos */}
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-10 animate-scroll whitespace-nowrap w-max">
            {/* FIRST SET */}
            {employersLogos.map((logo, index) => (
              <img
                key={`first-${index}`}
                src={logo}
                alt="employer"
                className="w-[40px] h-[40px] rounded-full object-cover shrink-0"
              />
            ))}

            {/* SECOND SET */}
            {employersLogos.map((logo, index) => (
              <img
                key={`second-${index}`}
                src={logo}
                alt="employer"
                className="w-[40px] h-[40px] rounded-full object-cover shrink-0"
              />
            ))}
            {/*Third set */}
            {employersLogos.map((logo, index) => (
              <img
                key={`third-${index}`}
                src={logo}
                alt="employer"
                className="w-[40px] h-[40px] rounded-full object-cover shrink-0"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Job Listings */}

      <DisplayRoleBased/>
      <TrainingCards />
      <Footer />
    </>
  );
};

export default JoobSeeker;
