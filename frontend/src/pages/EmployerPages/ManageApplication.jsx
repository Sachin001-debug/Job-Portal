import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

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
      <div className="bg-blue-200 p-2">
        <h1 className="text-3xl font-bold  text-gray-800">
          Manage Applications
        </h1>
      </div>
      {!selectedJob ? (
        //Show list of employer's posted jobs
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-6">Your Posted Jobs</h2>
          {myJobs.length === 0 ? (
            <p className="text-gray-600">You haven't posted any jobs yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myJobs.map((job) => (
                <div
                  key={job._id}
                  onClick={() => fetchApplications(job._id)}
                  className="bg-yellow-100 p-6 rounded-2xl shadow hover:bg-yellow-200 cursor-pointer transition border border-gray-200"
                >
                  <h3 className="font-semibold text-xl mb-2">{job.title}</h3>
                  <p className="text-blue-600 font-medium">{job.company}</p>
                  <p className="text-gray-800 mt-2">
                    {job.location} • {job.type}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        // Show applications for the selected job 
        <>
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setSelectedJob(null)}
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              ← Back to My Jobs
            </button>
            <h2 className="text-2xl font-semibold">
              Applications for:{" "}
              <span className="text-blue-700">{selectedJob.title}</span>
            </h2>
          </div>

          {applications.length === 0 ? (
            <p className="text-gray-600 text-lg">
              No applications received for this job yet.
            </p>
          ) : (
            <div className="space-y-6">
              {applications.map((app) => (
                <div
                  key={app._id}
                  className="bg-white p-6 rounded-2xl shadow flex flex-col md:flex-row justify-between items-start gap-4 border"
                >
                  <div className="flex-1 ">
                    <p>
                      <strong>Name:</strong> {app.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {app.email}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`font-medium ${
                          app.status === "approved"
                            ? "text-green-600"
                            : app.status === "rejected"
                              ? "text-red-600"
                              : "text-yellow-600"
                        }`}
                      >
                        {app.status || "pending"}
                      </span>
                    </p>
                    {app.resume && (
                      <a
                        href={`${API}${app.resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline block mt-2"
                      >
                        View Resume here
                      </a>
                    )}
                  </div>

                  <div className="flex gap-3 mt-4 md:mt-0">
                    <button
                      onClick={() => updateStatus(app._id, "approved")}
                      disabled={app.status === "approved"}
                      className="px-6 py-2 bg-green-600 cursor-pointer text-white rounded-xl disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-green-700 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(app._id, "rejected")}
                      disabled={app.status === "rejected"}
                      className="px-6 py-2 bg-red-600 cursor-pointer text-white rounded-xl disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-red-700 transition"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default ManageApplication;
