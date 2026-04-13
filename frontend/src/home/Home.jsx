import React from "react";
import logo from '../assets/S1K9S-removebg-preview.png';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
    <nav className="flex flex-wrap md:flex-nowrap gap-4 md:gap-12 p-3  items-center justify-between">
      <div className="ml-0 w-[50px] h-[50px] md:ml-12 w-10 h-10 flex items-center justify-center rounded-full">
        <img src={logo} alt="Logo"  />
      </div>

      <ul className="flex flex-wrap gap-4 md:gap-12 text-black font-medium">
        <li className="hover:text-orange-400 cursor-pointer">Home</li>
        <li className="hover:text-orange-400 cursor-pointer">About Us</li>
        <li className="hover:text-orange-400 cursor-pointer">Contact</li>
      </ul>

      <button onClick={() => navigate('/login')} className="mr-3 border-2 border-orange-500 px-4 py-1 rounded-lg text-black cursor-pointer text-sm  hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out md:text-base">
       Login/SignUp
    </button>
    </nav>

    <section className="bg-blue-200 w-[100vw] h-[80vh] flex  flex-col justify-center items-center gap-1">
        <div className="text-center text-gray-800">
         <h1 className="text-xl md:text-3xl font-bold ">Join Us & Explore </h1>
         <h1 className="text-xl md:text-3xl font-semibold ">Thousands of Jobs Available</h1>
         </div>
    

      
    </section>
    
    </>
  );
};

export default Home;