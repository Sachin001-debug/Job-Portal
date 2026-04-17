import React from "react";
import logo from "../assets/S1K9S-removebg-preview.png";
import { useNavigate } from "react-router-dom";
import { Circle } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-[#1A0B2E] text-white py-2 px-5 md:px-8 lg:px-12 top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl overflow-hidden">
              <img
                src={logo}
                alt="Company Logo"
                className="fade-in w-16 h-16 object-contain"
              />
            </div>
            <div className="fade-in hidden sm:block">
              <h2 className="font-bold text-2xl tracking-tight">Hire Nepal</h2>
              <p className="text-[10px] text-gray-400 -mt-1">Discover Opportunities</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <ul className="fade-in hidden md:flex items-center gap-8 text-base font-medium">
            <li>
              <a href="#home" className="hover:text-orange-400 transition-colors duration-300">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-orange-400 transition-colors duration-300">
                About Us
              </a>
            </li>
            <li>
              <a href="#opportunities" className="hover:text-orange-400 transition-colors duration-300">
                Opportunities
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-orange-400 transition-colors duration-300">
                Contact
              </a>
            </li>
          </ul>
          <button
            onClick={() => navigate("/login")}
            className="fade-in cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-2xl text-sm md:text-base transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
          >
            Login / Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="hero-bg w-full min-h-[80dvh] flex flex-col justify-center items-center relative px-5 py-2 md:px-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 z-10" />

        <div className="relative z-20 text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="fade-in inline-flex items-center italic gap-2 bg-white/10 backdrop-blur-md border-2 border-orange-300 text-white text-sm px-5 py-2 rounded-full mb-6">
            <Circle size={18} fill="#FF8C00" /> Join 1,000+ ambitious minds
          </div>

          {/* Main Heading */}
          <h1 className="fade-in text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tighter mb-6">
            Unlock Your Future With<br className="hidden md:block" />
            <span className="text-blue-700"> Endless Opportunities</span>
          </h1>

          {/* Subheading */}
          <p className="fade-in text-base md:text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto mb-10 px-4">
            Connect with thousands of internships, jobs, freelance projects, and learning 
            opportunities from top companies and organizations around the world.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => navigate("/login")}
              className="cursor-pointer fade-in bg-orange-500 hover:bg-orange-600 w-full sm:w-auto text-white font-semibold px-10 py-4 rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.97]"
            >
              Get Started — It's Free
            </button>

            <button
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="fade-in border-2 border-white/70 hover:border-white hover:bg-white/10 w-full sm:w-auto text-white font-medium px-10 py-4 rounded-2xl text-lg transition-all duration-300 backdrop-blur-sm"
            >
              Learn More
            </button>
          </div>

          {/* Trust Bar */}
          <div className="fade-in flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 text-xl">✓</span>
              <span>1,000+ Opportunities</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 text-xl">✓</span>
              <span>50+ Partner Companies</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 text-xl">✓</span>
              <span>Trusted by Students & Professionals</span>
            </div>
              <div className="flex items-center gap-2">
              <span className="text-emerald-400 text-xl">✓</span>
              <span>Hire or Get Hired</span>
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export default Home;