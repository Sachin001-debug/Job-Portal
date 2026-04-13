import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DisplayJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();
  const API = import.meta.env.VITE_API;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          `${API}/jobseeker/jobs?keyword=${keyword}`
        );
        setJobs(res.data.jobs || []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [keyword]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header & Search */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Next Opportunity</h1>
        <p className="text-gray-600 mb-6">Discover thousands of jobs from top companies</p>

        <div className="relative max-w-xl">
          <input
            type="text"
            placeholder="Search jobs by title, company, or keyword..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full px-5 py-4 pl-12 text-lg border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading amazing opportunities...</p>
          </div>
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">No jobs found!!!</h3>
          <p className="text-gray-600">Try adjusting your search keyword</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-700">
              Showing <span className="font-semibold">{jobs.length}</span> jobs
            </p>
          </div>

          {/* Professional Job Cards - 4 per row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="font-semibold text-xl text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h2>
                      <p className="text-blue-600 font-medium mt-1">{job.company}</p>
                    </div>
                  </div>

                  {/* Location & Type */}
                  <div className="flex flex-wrap gap-2 text-sm">
                    <div className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      📍 {job.location}
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {job.type === "Full-time" ? "⏰" : "🕒"} {job.type}
                    </div>
                  </div>
                </div>

                {/* Salary */}
                {job.salary && (
                  <div className="px-6 py-3 bg-green-50 border-t border-b border-gray-100">
                    <p className="text-green-700 font-semibold text-lg">
                      {job.salary}
                    </p>
                  </div>
                )}

                {/* Description */}
                <div className="p-6 pt-4">
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {job.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="px-6 py-5 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Posted recently</span>
                  <button
                   onClick={()=>navigate(`/dashboard/jobseeker/jobs/apply/${job._id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-2xl cursor-pointer text-sm font-medium transition-all active:scale-95"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DisplayJobs;