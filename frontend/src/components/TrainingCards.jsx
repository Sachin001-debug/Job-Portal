import React from "react";
import { DummyTrainings } from "../assets/assests";
import { Briefcase } from "lucide-react";

const TrainingCards = () => {
  return (
    <>
      <div className="flex items-center gap-3 ml-5 mb-6">
        <div className="p-2 bg-yellow-300 text-yellow-800 rounded-full shadow-sm flex items-center justify-center">
            <Briefcase size={20} />
        </div>
        <h1 className="text-2xl font-bold text-blue-700 m-0">Available Trainings</h1>
     </div>
    
    <div className="grid grid-cols-1 mt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {DummyTrainings.map((training) => (
        <div
          key={training.id}
          className="flex flex-col cursor-pointer bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition"
        >
          {/* Logo */}
          <img
            src={training.logo}
            alt={training.title}
            className="w-full h-48 sm:h-56 md:h-64 lg:h-56 object-cover"
          />

          {/* Details */}
          <div className="flex flex-col items-center p-4 text-center">
            <h1 className="text-xl font-semibold mb-2">{training.title}</h1>
            <p className="text-gray-600 mb-1">Provider: {training.provider}</p>
            <p className="text-gray-600">Duration: {training.duration}</p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default TrainingCards;