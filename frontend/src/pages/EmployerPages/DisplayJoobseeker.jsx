import axios from "axios";
import React, { useEffect, useState } from "react";

const DisplayJobseeker = () => {
  const API = import.meta.env.VITE_API;

  const [users, setUsers] = useState([]);

  const getJobseeker = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/user/profiles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data.users); 

      console.log("Fetched successfully!!", res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getJobseeker();
    console.log("token")
  }, []);

  return (
    <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <div
          key={user._id}
          className="border rounded-xl p-4 shadow-md bg-white"
        >
          <img
  src={user.profileImage ? `${API}/${user.profileImage}` : "/default.png"}
  alt="profile"
  className="w-16 h-16 rounded-full object-cover"
/>

          <h2 className="text-lg font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-purple-600">{user.role}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayJobseeker;