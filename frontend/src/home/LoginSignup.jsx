import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/S1K9S-removebg-preview.png";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import { set } from "mongoose";

const LoginSignup = () => {
  const [currentForm, setCurrentForm] = useState("login");
  const navigate = useNavigate();
  //form DATA HERE!!
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const API = import.meta.env.VITE_API;

  const handleRegister = async () => {
    try {
      if (!name || !email || !password || !role) {
       toast.error("Please enter all fields");
        return;
      }

      if (password.length < 8) {
         toast.error("Password must be greater or equal to 8 digit");
         return;
      }
      const res = await axios.post(`${API}/user/register`, {
        name,
        email,
        password,
        role,
      });
      console.log(res.data);

      if (res.data?.message) {
        toast.success("Registered successfully, please login");
        setCurrentForm("login");
        setName("");
        setPassword("");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error occured")
    }
  };

 const handleLogin = async () => {
  try {
    setName("");
    setPassword("")
    if (!email || !password) {
      toast.error("Please enter all fields");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    const res = await axios.post(`${API}/user/login`, {
      email,
      password,
    });

    console.log(res.data);

    if (res.data?.success && res.data?.user) {
      const userRole = res.data.user.role;   // ← Get role from backend response

      toast.success("Logged in successfully!");
      localStorage.setItem("token", res.data.token);

      if (userRole === "employer") {
        navigate('/dashboard/employer');
      } else if (userRole === "jobseeker") {
        navigate('/dashboard/jobseeker');
      } else {
        navigate('/dashboard'); 
      }
    } else {
      toast.error(res.data?.message || "Login failed");
    }
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Invalid credentials");
  }
};
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left side */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-[#140727] to-[#2a0f4a] flex items-center justify-center flex-col text-white p-8">
        <div>
          <img src={logo} alt="Logo" className="fade-in  w-[100px] h-[150px] " />
          <div className="fade-in  max-w-md text-center md:text-left">
            {currentForm === "login" ? (
              <h1 className="text-2xl md:text-4xl font-bold mb-4">
                Welcome Back!
              </h1>
            ) : (
              <h1 className="text-2xl md:text-4xl font-bold mb-4">
                Create Your Account
              </h1>
            )}
            <p className="text-base md:text-lg opacity-90">
              Enter your details to continue. Switch between login and signup
              anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 md:p-8 bg-gray-50">
        <div className="fade-in  w-full max-w-md border border-gray-200 shadow-lg rounded-xl p-6 md:p-8 flex flex-col items-center gap-5 bg-white transition-all duration-300">
          {/* Signup extra field */}
          {currentForm === "signup" && (
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm md:text-base font-medium">Name:</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="w-full border border-gray-300 rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your name..."
              />
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm md:text-base font-medium">Email:</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="w-full border border-gray-300 rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter email..."
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm md:text-base font-medium">
              Password:
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter password..."
            />
          </div>

          {currentForm === "signup" && (
            <>
              <label value={role} className="text-sm md:text-base font-medium">
                Role:
              </label>
              <select
              value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-[400px] bg-gray-200 border-none focus:border-none border-gray-300 cursor-pointer rounded-md py-2 px-3 outline-none"
              >
                <option value="">Select Role</option>
                <option value="jobseeker" className="cursor-pointer">
                  Job Seeker
                </option>
                <option value="employer" className="cursor-pointer">
                  Employer
                </option>
              </select>
            </>
          )}

          {/* Button */}
          <button
            onClick={currentForm === "signup" ? handleRegister : handleLogin}
            className="mt-2 w-full bg-orange-500 hover:bg-orange-600 transition-all py-2 rounded-lg text-white font-medium shadow-md"
          >
            {currentForm === "login" ? "Login" : "Sign Up"}
          </button>

          {/* Toggle */}
          <p className="text-sm md:text-base text-gray-600 text-center">
            {currentForm === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <span
              onClick={() =>
                setCurrentForm(currentForm === "login" ? "signup" : "login")
              }
              className="text-orange-600 font-semibold cursor-pointer hover:underline"
            >
              {currentForm === "login" ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </div>
      <ToastContainer closeOnClick theme="light"/>
    </div>
  );
};

export default LoginSignup;
