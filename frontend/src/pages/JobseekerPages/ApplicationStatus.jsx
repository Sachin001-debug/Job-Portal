import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapPin } from "lucide-react";

const ApplicationStatus = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API;

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${API}/jobseeker/job/get-application`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications(res.data.applications || []);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">My Applications</h1>
        <p className="text-gray-600 mt-2">
          Track the status of all your job applications
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            📋
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No applications yet
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            You haven't applied to any jobs yet. Start exploring opportunities!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Job Information */}
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                      💼
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="text-2xl font-semibold text-gray-900 leading-tight">
                        {app.job?.title}
                      </h2>
                      <p className="text-xl text-gray-700 mt-1">
                        {app.job?.company}
                      </p>
                      <p className="text-gray-500 mt-2 flex items-center gap-2">
                    <MapPin size={18} className="text-red-800"/> {app.job?.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex-shrink-0">
                  <span
                    className={`inline-flex items-center px-6 py-3 rounded-2xl text-sm font-semibold uppercase tracking-wider transition-all ${
                      app.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : app.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {app.status === "approved"
                      ? "Approved"
                      : app.status === "rejected"
                      ? " Rejected"
                      : " Pending Review"}
                  </span>
                </div>
              </div>

              {/* Optional Footer Row (you can add more info here later) */}
              <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 flex items-center justify-between text-sm text-gray-500">
                <p>Applied on: {new Date(app.createdAt || Date.now()).toLocaleDateString()}</p>
                {app.job?.type && (
                  <p className="capitalize">{app.job.type}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationStatus;