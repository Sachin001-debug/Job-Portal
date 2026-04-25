import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { File } from "lucide-react";

const ManageApplication = () => {
  
  const [myJobs, setMyJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API;

  // Fetch all jobs posted by logged-in employer
  const fetchMyJobs = async () => {
    try {
      const res = await axios.get(`${API}/employer/jobs/myjobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyJobs(res.data.jobs || []);
    } catch (err) {
      console.error("Fetch My Jobs Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to load your jobs");
    } finally {
      setLoading(false);
    }
  };

  //  Fetch applications when employer clicks on a job
  const fetchApplications = async (jobId) => {
    try {
      setLoading(true);
      console.log("Fetching applications for jobId:", jobId);

      const res = await axios.get(
        `${API}/employer/jobs/${jobId}/applications`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      console.log("API Response:", res.data);

      setApplications(res.data.applications || []);
      const job = myJobs.find((j) => j._id === jobId);
      setSelectedJob(job);
    } catch (err) {
      console.error("Full Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  // Approve or Reject application
  const updateStatus = async (appId, status) => {
    try {
      await axios.put(
        `${API}/employer/applications/${appId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success(
        `Application ${status} successfull, an email will be sent to client!!`,
      );
      // Refresh the list
      if (selectedJob) fetchApplications(selectedJob._id);
    } catch (err) {
      toast.error("Failed to update status");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  if (loading && !selectedJob) {
    return (
      <div className="p-10 text-center text-lg">
        Loading your posted jobs...
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 px-8 shadow">
        <h1 className="text-4xl font-bold">Manage Applications</h1>
      </div>

      {!selectedJob ? (
        // List of Posted Jobs
        <div className="p-8">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800">Your Posted Jobs</h2>

          {myJobs.length === 0 ? (
            <p className="text-gray-600 text-lg">You haven't posted any jobs yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myJobs.map((job) => (
                <div
                  key={job._id}
                  onClick={() => fetchApplications(job._id)}
                  className="bg-white border border-gray-200 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-blue-300 cursor-pointer transition-all duration-300"
                >
                  <h3 className="font-semibold text-2xl text-gray-900 mb-3 line-clamp-2">
                    {job.title}
                  </h3>
                  <p className="text-blue-600 font-medium text-lg">{job.company}</p>
                  <p className="text-gray-600 mt-4 flex items-center gap-2">
                    📍 {job.location} • {job.type}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        // Applications for Selected Job
        <>
          <div className="flex items-center justify-between px-8 py-6 border-b bg-white sticky top-0 z-10">
            <button
              onClick={() => setSelectedJob(null)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition"
            >
              ← Back to My Jobs
            </button>
            <h2 className="text-2xl font-semibold text-gray-800">
              Applications for: <span className="text-blue-700">{selectedJob.title}</span>
            </h2>
          </div>

          <div className="p-8">
            {applications.length === 0 ? (
              <p className="text-gray-600 text-lg">No applications received for this job yet.</p>
            ) : (
              <div className="space-y-6">
                {applications.map((app) => (
                  <div
                    key={app._id}
                    className="bg-white border border-gray-200 rounded-3xl shadow-sm p-7 flex flex-col lg:flex-row justify-between items-start gap-6"
                  >
                    <div className="flex-1 space-y-3">
                      <div>
                        <span className="font-medium text-gray-500">Name:</span>{" "}
                        <span className="font-semibold text-lg text-gray-900">{app.name}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-500">Email:</span>{" "}
                        <span className="text-gray-700">{app.email}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-500">Status:</span>{" "}
                        <span
                          className={`font-semibold text-base ${
                            app.status === "approved"
                              ? "text-green-600"
                              : app.status === "rejected"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {app.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : "Pending"}
                        </span>
                      </div>

                      {app.resume && (
                        <a
                          href={`${API}${app.resume}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 underline font-medium mt-2"
                        >
                          <File size={18}/> View Resume
                        </a>
                      )}
                    </div>

                    <div className="flex gap-4 flex-shrink-0">
                      <button
                        onClick={() => updateStatus(app._id, "approved")}
                        disabled={app.status === "approved"}
                        className="cursor-pointer px-8 py-3 bg-green-600 text-white rounded-2xl font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(app._id, "rejected")}
                        disabled={app.status === "rejected"}
                        className="cursor-pointer px-8 py-3 bg-red-600 text-white rounded-2xl font-medium hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      <div className="flex justify-center items-center text-gray-500">
        If you feel any issues regarding this, feel free to contact us at  <span className="text-blue-800s"> support@hirenepal.com</span>
      </div>

      <ToastContainer />


    </>
  );
};

export default ManageApplication;
