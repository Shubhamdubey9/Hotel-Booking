import React, { useState, useRef } from "react";
import { useAppContext } from "@/context/useAppContext";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const ViewProfile = ({ onClose }) => {
  const { user, setUser } = useAppContext();
  const [fullname, setFullname] = useState(user?.fullname || "");
  const [bio, setBio] = useState(user?.profile?.bio || "");
  const [profilePhoto, setProfilePhoto] = useState(
    user?.profile?.profilePhoto || ""
  );
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  // Allow both 'user' and 'hotelOwner' to view/manage their profile
  if (!user || (user.role !== "user" && user.role !== "hotelOwner")) {
    return (
      <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 py-8 px-2 sm:px-4 md:px-8 mt-15">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-blue-100 flex flex-col items-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Access Denied</h2>
          <p className="text-gray-600 text-center">
            Only users and hotel owners can view and manage their profile.
          </p>
        </div>
      </div>
    );
  }

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/update-profile-pic`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setProfilePhoto(res.data.profilePhoto);
        setUser((prev) => ({
          ...prev,
          profile: { ...prev.profile, profilePhoto: res.data.profilePhoto },
        }));
        toast.success("Profile picture updated!");
      } else {
        toast.error(res.data.message || "Failed to update profile picture");
      }
    } catch {
      toast.error("Error updating profile picture");
    } finally {
      setLoading(false);
    }
  };

  // Overlay click handler
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <div
      className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 py-8 px-2 sm:px-4 md:px-8 mt-15 fixed top-0 left-0 z-50"
      onClick={handleOverlayClick}
      style={{ inset: 0 }}
    >
      <div
        className="w-full max-w-2xl bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-blue-100 flex flex-col items-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mb-6">
          <img
            src={profilePhoto || "/default-profile.png"}
            alt="Profile"
            className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-blue-200 shadow-md transition-all duration-300"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handlePhotoChange}
            disabled={loading}
          />
        </div>
        <div className="w-full flex flex-col items-center gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 text-center break-words">
            {user?.fullname}
          </h2>
          <p className="text-gray-600 text-center text-base sm:text-lg font-medium">
            {user?.email}
          </p>
          <p className="text-gray-600 text-center text-base sm:text-lg font-medium">
            {user?.phoneNumber}
          </p>
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mt-1 mb-2 shadow-sm">
            Role: {user?.role}
          </span>
          <p className="text-gray-500 text-center mt-2 whitespace-pre-line text-base sm:text-lg max-w-xl">
            {user?.profile?.bio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
