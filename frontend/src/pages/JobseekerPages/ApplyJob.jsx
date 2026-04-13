import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FileText, Mail } from "lucide-react";
import uploadImg from "../../assets/upload-file.jpg";
import { useRef } from "react";
import { toast, ToastContainer } from "react-toastify";

const ApplyJob = () => {
  const { id } = useParams();
  const API = import.meta.env.VITE_API;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const fileInputRef = useRef(null);

  // Applicant form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch job details
const fetchJob = async () => {
  try {
    setLoading(true);
    const res = await axios.get(`${API}/jobseeker/jobs/${id}`);
    
    if (res.data.success) {
      setJob(res.data.job);
    } else {
      console.error("API returned error:", res.data.message);
    }
  } catch (err) {
    console.error("Error fetching job:", err.response?.data || err.message);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchJob();
  }, [id]);

const applyJobHandler = async (e) => {
  e.preventDefault();

  // Check all required fields
  if (!name || !email || !resume) {
    return toast.error("All field required!");
  }

  try {
    const token = localStorage.getItem("token"); // get logged-in user token
    if (!token) {
      toast.error("You must be logged-in")
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("jobId", job._id);
    formData.append("resume", resume);

    setSubmitting(true);

    const res = await axios.post(
      `${API}/jobseeker/job/apply`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // important for auth
        },
      }
    );

    if (res.data.success) {
      toast.success("Applied successfully!")
      // Reset form
      setName("");
      setEmail("");
      setResume(null);
    } else {
      toast.error("Failed to error! ")
    }
  } catch (err) {
    console.error(err);
    toast.error("Server Error, We will be back soon!")
  } finally {
    setSubmitting(false);
  }
};
  return (
    <div className="">
      {loading ? (
        <div className="flex justify-center align-center py-20">
          <p className="text-gray-600 text-4xl">Loading job details...</p>
        </div>
      ) : job ? (
        <>
          <nav className="flex drop-shadow-lg rounded-lg bg-white w-[100vw] h-[60px] items-center px-4">
            <h1 className="text-xl font-medium">
              Apply job for
              <span className="text-2xl  text-purple-800"> {job.title}</span>
            </h1>
          </nav>
          <main className="max-w-7xl bg-blue-100 mx-auto px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* LEFT: Job Details */}
              <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {job.title}
                </h2>

                <p className="text-blue-600 font-medium mb-4">{job.company}</p>

                <div className="flex gap-3 mb-4 flex-wrap">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    📍 {job.location}
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {job.type}
                  </span>
                </div>

                {job.salary && (
                  <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg mb-4 font-semibold">
                    <span className="text-black">Salary: </span> {job.salary}
                  </div>
                )}

                <p className="text-gray-700 leading-relaxed">
                  {job.description}
                </p>
              </div>

              {/* RIGHT: Apply Form */}
              <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-6">
                <div className="flex gap-2">
                  <FileText className="size-8 text-purple-700" />
                  <h2 className="text-xl text-purple-900 font-semibold mb-6">
                    Apply for this Job
                  </h2>
                </div>
                <p className="text-gray-600s mb-4">
                  Fill the form below to apply.
                </p>
                <form onSubmit={applyJobHandler} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Full Name:
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email:
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Resume */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Upload Resume
                    </label>

                    {/* Hidden file input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => setResume(e.target.files[0])}
                      className="hidden"
                    />

                    {/* Clickable Image */}
                    <img
                      src={uploadImg}
                      alt="Upload"
                      className="w-[60px] h-[50px] cursor-pointer border rounded-md p-1 hover:scale-105 transition"
                      onClick={() => fileInputRef.current.click()}
                    />
                    {resume && (
                      <p className="text-sm text-yellow-900 mt-2">
                        Selected: {resume.name}
                      </p>
                    )}
                  </div>
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-all active:scale-95"
                  >
                    {submitting ? "Submitting..." : " Apply Now"}
                  </button>
                </form>
              </div>
            </div>
          </main>

          <section className="w-full bg-gray-900 text-white py-8">
            <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
              <h2 className="text-lg font-semibold">
                Need help submitting your application?
              </h2>

              <p className="text-gray-300 text-sm">
                If you're facing any issues while applying, feel free to contact
                us.
              </p>

              <p className="text-sm">
                Email:
                <span className="text-blue-400 ml-1">support@hirehub.com</span>
              </p>

              <p className="text-sm">
                Phone:
                <span className="text-blue-400 ml-1">+977-9748807614</span>
              </p>
            </div>
          </section>
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">Job not found</p>
        </div>
      )}
      <ToastContainer/>
    </div>
  );
};

export default ApplyJob;
