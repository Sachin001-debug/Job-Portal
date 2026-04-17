import React from "react";
import LogoImg from "../assets/user-img.jpg";
import {
  Briefcase,
  FileText,
  BarChart2,
  Settings,
  SearchIcon,
} from "lucide-react";
import { DummyTopCandidates } from "../assets/assests";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DisplayRoleBased from "../shared/DisplayRoleBased";


const Employer = () => {

  const handleLogout = ()=>{
    const token = localStorage.getItem("token");

    localStorage.removeItem("token");

    navigate('/login');
     toast.success("Logout Successfull!");
  }
  const navigate = useNavigate();
  return (
    <>
      <nav className="flex items-center justify-between bg-white p-4 shadow-md border-b border-gray-200">
        {/* Left: Title */}
        <h1 className="text-xl font-bold text-gray-800">Hire Nepal</h1>

        {/* Center: Menu Items with icons */}
        <ul className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <li onClick={()=>navigate('/dashboard/employer/postjob')} className="flex items-center gap-1 hover:text-purple-600 cursor-pointer">
            <Briefcase size={18} />
            Post a Job
          </li>
          <li onClick={()=>navigate('/dashboard/employer/applications')} className="flex items-center gap-1 hover:text-purple-600 cursor-pointer">
            <FileText size={18} />
            Manage Applications
          </li>
          <li onClick={()=>navigate('/dashboard/employer/analytics')} className="flex items-center gap-1 hover:text-purple-600 cursor-pointer">
            <BarChart2 size={18} />
            View Analytics
          </li>
          <li className="flex items-center gap-1 hover:text-purple-600 cursor-pointer">
            <Settings size={18} />
            Settings
          </li>
        </ul>

    <div className="flex gap-4 justify-center">
      <button onClick={handleLogout} className="cursor-pointer mt-2">
        logout
      </button>
       <div className="flex items-center gap-3">
          <img
            src={LogoImg}
            alt="Profile"
            className="w-10 h-10 rounded-full border border-gray-300"
          />
        </div>
    </div>

        {/* Right: Profile Image */}
       
      </nav>

      <section className="p-4 bg-blue-100 h-[300px] flex items-center justify-around">
        {/* Welcome Message */}
        <div className="w-[40%] ">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome To Employer Dashboard!
          </h2>
          <p className="text-gray-600">
            Manage your job postings, review applications, and track analytics
            all in one place.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-[40%] flex flex-col gap-4">
          {/* Search Box */}
          <div className="flex items-center border border-gray-400 rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search people..."
              className="flex-1 p-2 outline-none"
            />
            <button className="bg-purple-500 px-3 py-2 flex items-center justify-center hover:bg-purple-600 transition">
              <SearchIcon size={18} className="text-white" />
            </button>
          </div>

          {/* Job Roles List */}
          <ul className=" rounded-lg p-3 flex flex-wrap gap-2 text-gray-700">
            <li className="px-3 py-1 border border-purple-500 text-purple-600 rounded-full cursor-pointer hover:bg-purple-500 hover:text-white transition duration-300">
              Software Engineer
            </li>
            <li className="px-3 py-1 border border-purple-500 text-purple-600 rounded-full cursor-pointer hover:bg-purple-500 hover:text-white transition duration-300">
              Product Manager
            </li>
            <li className="px-3 py-1 border border-purple-500 text-purple-600 rounded-full cursor-pointer hover:bg-purple-500 hover:text-white transition duration-300">
              Data Analyst
            </li>
            <li className="px-3 py-1 border border-purple-500 text-purple-600 rounded-full cursor-pointer hover:bg-purple-500 hover:text-white transition duration-300">
              Freelancer
            </li>
            <li className="px-3 py-1 border border-purple-500 text-purple-600 rounded-full cursor-pointer hover:bg-purple-500 hover:text-white transition duration-300">
              Designer
            </li>
          </ul>
        </div>
      </section>


       {/* Top Candidates Section */}
       
       <DisplayRoleBased/>
    </>
  );
};

export default Employer;
