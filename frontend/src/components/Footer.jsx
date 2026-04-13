import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        {/* Column 1: HireNepal Description */}
        <div>
          <h1 className="text-2xl font-bold mb-4">HireNepal</h1>
          <p className="text-gray-300 text-sm">
            HireNepal is the premier job portal connecting talented professionals with top employers across Nepal. Find your dream job or hire the best talent today.
          </p>
        </div>

        {/* Column 2: Job Seeker */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Job Seeker</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="hover:text-blue-400 cursor-pointer">Find Jobs</li>
            <li className="hover:text-blue-400 cursor-pointer">Upload Resume</li>
            <li className="hover:text-blue-400 cursor-pointer">Career Advice</li>
            <li className="hover:text-blue-400 cursor-pointer">Training & Courses</li>
          </ul>
        </div>

        {/* Column 3: Employer */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Employer</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="hover:text-blue-400 cursor-pointer">Post Jobs</li>
            <li className="hover:text-blue-400 cursor-pointer">Search Resumes</li>
            <li className="hover:text-blue-400 cursor-pointer">Recruitment Solutions</li>
            <li className="hover:text-blue-400 cursor-pointer">Pricing Plans</li>
          </ul>
        </div>

        {/* Column 4: About Us */}
        <div>
          <h2 className="text-xl font-semibold mb-4">About Us</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="hover:text-blue-400 cursor-pointer">Our Story</li>
            <li className="hover:text-blue-400 cursor-pointer">Team</li>
            <li className="hover:text-blue-400 cursor-pointer">Careers</li>
            <li className="hover:text-blue-400 cursor-pointer">Blog</li>
          </ul>
        </div>

        {/* Column 5: Contact Us */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Email: <span className="text-blue-400">support@hirenepal.com</span></li>
            <li>Phone: <span className="text-blue-400">+977 9748807614</span></li>
            <li>Address: Butwal, Nepal</li>
            <li className="hover:text-blue-400 cursor-pointer">Contact Form</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-8">
        &copy; {new Date().getFullYear()} HireNepal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;