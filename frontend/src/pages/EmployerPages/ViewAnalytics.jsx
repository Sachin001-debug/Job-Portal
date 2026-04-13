import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Briefcase, Users, CheckCircle, XCircle, ArrowBigRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ViewAnalytics = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
  });

  const [jobStats, setJobStats] = useState([]); 
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API;
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Get all applications for the employer
      const res = await axios.get(`${API}/employer/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const applications = res.data.applications || [];

      // Calculate overall stats
      const totalApplications = applications.length;
      const approved = applications.filter(app => app.status === "approved").length;
      const rejected = applications.filter(app => app.status === "rejected").length;
      const pending = totalApplications - approved - rejected;

      // Group by job for per-job breakdown
      const jobMap = {};
      applications.forEach(app => {
        const jobId = app.job?._id || app.job;
        const jobTitle = app.job?.title || "Unknown Job";

        if (!jobMap[jobId]) {
          jobMap[jobId] = {
            jobTitle,
            total: 0,
            approved: 0,
            rejected: 0,
            pending: 0,
          };
        }

        jobMap[jobId].total += 1;
        if (app.status === "approved") jobMap[jobId].approved += 1;
        else if (app.status === "rejected") jobMap[jobId].rejected += 1;
        else jobMap[jobId].pending += 1;
      });

      const jobStatsArray = Object.values(jobMap);

      setStats({
        totalJobs: jobStatsArray.length,
        totalApplications,
        approved,
        rejected,
        pending,
      });

      setJobStats(jobStatsArray);

    } catch (err) {
      console.error("Analytics fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ["#22c55e", "#ef4444", "#eab308"];

  const pieData = [
    { name: "Approved", value: stats.approved, color: "#22c55e" },
    { name: "Rejected", value: stats.rejected, color: "#ef4444" },
    { name: "Pending", value: stats.pending, color: "#eab308" },
  ];

  if (loading) {
    return <div className="p-10 text-center text-xl">Loading Analytics...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Analytics Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
          <div className="p-4 bg-blue-100 rounded-xl">
            <Briefcase className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500">Total Jobs Posted</p>
            <p className="text-3xl font-bold">{stats.totalJobs}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
          <div className="p-4 bg-purple-100 rounded-xl">
            <Users className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <p className="text-gray-500">Total Applications</p>
            <p className="text-3xl font-bold">{stats.totalApplications}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
          <div className="p-4 bg-green-100 rounded-xl">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <p className="text-gray-500">Approved</p>
            <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
          <div className="p-4 bg-red-100 rounded-xl">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <div>
            <p className="text-gray-500">Rejected</p>
            <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart - Overall Status */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-6">Application Status Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Per Job Applications */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-6">Applications per Job</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={jobStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="jobTitle" angle={-15} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="approved" fill="#22c55e" name="Approved" />
              <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
              <Bar dataKey="pending" fill="#eab308" name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Job-wise Summary Table */}
      <div className="mt-10 bg-white rounded-2xl shadow overflow-hidden">
        <h2 className="text-xl font-semibold p-6 border-b">Detailed Job Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left">Job Title</th>
                <th className="px-6 py-4 text-center">Total Applications</th>
                <th className="px-6 py-4 text-center text-green-600">Approved</th>
                <th className="px-6 py-4 text-center text-red-600">Rejected</th>
                <th className="px-6 py-4 text-center text-yellow-600">Pending</th>
              </tr>
            </thead>
            <tbody>
              {jobStats.map((job, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{job.jobTitle}</td>
                  <td className="px-6 py-4 text-center font-semibold">{job.total}</td>
                  <td className="px-6 py-4 text-center text-green-600 font-medium">{job.approved}</td>
                  <td className="px-6 py-4 text-center text-red-600 font-medium">{job.rejected}</td>
                  <td className="px-6 py-4 text-center text-yellow-600 font-medium">{job.pending}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-6 flex justify-center">
  <button
    onClick={() => navigate('/dashboard/employer/applications')}
    className="group flex items-center gap-3 text-blue-600 hover:text-blue-700 font-semibold text-lg transition-all duration-200 cursor-pointer relative"
  >
    <span className="relative">
      Manage Applications
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
    </span>
    
    <ArrowBigRight 
      className="w-6 h-6 transition-transform group-hover:translate-x-1" 
    />
  </button>
</div>
    </div>
  );
};

export default ViewAnalytics;