import React from "react";
import { DummyTopJobs } from "../assets/assests";
import {Zap } from "lucide-react";
const JobSeekerTopJobs = () => {
  return (
    <div className="p-4">
        {/*Text */}
    <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-red-300 text-red-700 rounded-full shadow-md flex items-center justify-center">
          <Zap size={20} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Top Jobs</h1>
   </div>
      {/* Grid card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {DummyTopJobs.map((job) => (
          <div key={job.id} className="flex cursor-pointer justify-between items-center p-4 bg-white rounded-lg shadow-md border border-gray-200" >
            {/*Left img */}
              <img
              src={job.logo}
              alt={job.title}
              className="w-16 h-16 rounded-full border border-gray-500 object-cover"
            />
            {/* Right: Job details */}
            <div className="flex flex-col">
              <h2 className="font-medium text-lg">{job.title}</h2>
              <p className="text-gray-500">{job.company}</p>
              <p className="text-gray-500">{job.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSeekerTopJobs;