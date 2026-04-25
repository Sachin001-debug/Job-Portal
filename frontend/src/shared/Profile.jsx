import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Camera, Save, User, Lock, Briefcase, Building, Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Password change states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Show/Hide Password States
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const API = import.meta.env.VITE_API;
  const Base_API = import.meta.env.VITE_URL;

  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.get(`${API}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = res.data.user;
      setUser(userData);

      // FIXED: Use correct variable name Base_API (not BaseAPI)
      if (userData.profileImage) {
        // Remove any leading slashes to prevent double slashes
        const imagePath = userData.profileImage.replace(/^\/+/, '');
        setImagePreview(`${Base_API}/${imagePath}`);
      } else {
        setImagePreview(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load profile");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = async () => {
    if (!selectedFile) return;
    setIsSaving(true);

    const formData = new FormData();
    formData.append("profileImage", selectedFile);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API}/user/upload-image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        // Refresh user data to get the new image path
        await getUser();
        toast.success("Profile picture updated successfully!");
        setSelectedFile(null);
      } else {
        toast.error(response.data.message || "Failed to update picture");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err.response?.data?.message || "Failed to update picture");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all password fields");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setIsChangingPassword(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API}/user/change-password`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const isEmployer = user?.role === "employer";

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Sidebar - Profile Picture & Basic Info */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-3xl shadow-sm p-8 text-center sticky top-8">
              <div className="relative w-40 h-40 mx-auto mb-6">
                <img
                  src={imagePreview || "/default-avatar.png"}
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-avatar.png";
                  }}
                />
                <label className="absolute bottom-3 right-3 bg-blue-600 text-white p-3 rounded-full cursor-pointer hover:bg-blue-700 transition shadow">
                  <Camera size={20} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {selectedFile && (
                <button
                  onClick={handleUploadImage}
                  disabled={isSaving}
                  className="mt-4 w-full bg-green-600 text-white py-3 px-6 rounded-2xl hover:bg-green-700 disabled:bg-gray-400 flex items-center justify-center gap-2 font-medium"
                >
                  {isSaving ? "Uploading..." : "Save Photo"}
                  <Save size={18} />
                </button>
              )}

              <h2 className="text-3xl font-semibold mt-6">{user?.name}</h2>
              <p className="text-gray-500 mt-1">{user?.email}</p>

              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600 bg-gray-100 py-2 px-4 rounded-2xl inline-flex">
                {isEmployer ? <Building size={18} /> : <Briefcase size={18} />}
                <span className="capitalize font-medium">
                  {isEmployer ? "Employer" : "Job Seeker"}
                </span>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-3xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <User size={26} className="text-blue-600" />
                Basic Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={user?.name || ""}
                    readOnly
                    className="w-full p-4 border border-gray-300 rounded-2xl bg-gray-50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="w-full p-4 border border-gray-300 rounded-2xl bg-gray-50 focus:outline-none"
                  />
                </div>

                {isEmployer && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                      <input
                        type="text"
                        value={user?.company || "Not provided"}
                        readOnly
                        className="w-full p-4 border border-gray-300 rounded-2xl bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={user?.location || "Not provided"}
                        readOnly
                        className="w-full p-4 border border-gray-300 rounded-2xl bg-gray-50"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Change Password Section */}
            <div className="bg-white rounded-3xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <Lock size={26} className="text-blue-600" />
                Change Password
              </h2>

              <div className="space-y-6">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleChangePassword}
                  disabled={isChangingPassword}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-4 rounded-2xl transition flex items-center justify-center gap-2 mt-4"
                >
                  {isChangingPassword ? "Updating Password..." : "Update Password"}
                  <Save size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;