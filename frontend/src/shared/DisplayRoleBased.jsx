import React, { useEffect, useState } from "react";
import axios from "axios";
import { Zap } from "lucide-react";

const DisplayRoleBased = () => {
  const [users, setUsers] = useState([]);

  const API = import.meta.env.VITE_API;
  const BASE_URL = import.meta.env.VITE_URL;

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/user/profiles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="p-4">
      {/* Text */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-red-300 text-red-700 rounded-full shadow-md flex items-center justify-center">
          <Zap size={20} />
        </div>

        <h1 className="text-2xl font-bold text-gray-800">
          Top Profiles
        </h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex cursor-pointer justify-between items-center p-4 bg-white rounded-lg shadow-md border border-gray-200"
          >
            {/* Left Image */}
            <img
              src={
                user.profileImage
                  ? `${BASE_URL}/${user.profileImage}`
                  : "https://via.placeholder.com/60"
              }
              alt={user.name}
              className="w-16 h-16 rounded-full border border-gray-500 object-cover"
            />

            {/* Right Details */}
            <div className="flex flex-col">
              <h2 className="font-medium text-lg">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayRoleBased;