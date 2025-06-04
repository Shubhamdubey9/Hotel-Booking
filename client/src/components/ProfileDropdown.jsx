import React, { useState } from "react";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSignOut = () => {
    alert("Signed out!");
    // Add logic to clear session/token if needed
  };

  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30">
      <div className="relative inline-block text-left">
        {/* Profile Trigger */}
        <div
          onClick={toggleDropdown}
          className="flex items-center gap-2 cursor-pointer border rounded-full p-2 bg-orange-500 text-white font-semibold"
        >
          <div className="w-8 h-8 rounded-full bg-white text-orange-500 flex items-center justify-center font-bold">
            T
          </div>
          The Days
        </div>

        {/* Dropdown Card */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white border shadow-xl rounded-lg p-4 z-50">
            <p className="text-sm font-semibold text-gray-800">The Days</p>
            <p className="text-xs text-gray-500 mb-4">tdays3138@gmail.com</p>

            <div className="space-y-2">
              <button className="w-full text-left text-sm text-gray-700 hover:bg-gray-100 p-2 rounded">
                ⚙️ Manage account
              </button>
              <button className="w-full text-left text-sm text-gray-700 hover:bg-gray-100 p-2 rounded">
                📅 my-booking
              </button>
              <button
                onClick={handleSignOut}
                className="w-full text-left text-sm text-red-600 hover:bg-red-100 p-2 rounded"
              >
                🚪 Sign out
              </button>
            </div>

            <div className="text-xs text-center text-orange-500 mt-4 border-t pt-2">
              Development mode
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDropdown;
