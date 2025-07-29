"use client";
import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-yellow-400 text-white flex items-center justify-center p-6">
      <div className="grid grid-cols-12 w-full max-w-[1400px] h-[700px] border border-yellow-900 rounded-2xl overflow-hidden">
        {/* Left Panel: Sidebar */}
        <div className="col-span-3  bg-gradient-to-tl from-yellow-600   shadow-md  to-yellow p-4 space-y-4">
          <div className="text-2xl font-bold text-blue-400 mb-2">QuickChat</div>
          <input
            type="text"
            placeholder="Search User..."
            className="w-full p-2 rounded-full bg-gray-800 text-white placeholder-gray-400"
          />
        </div>

        {/* Center Panel: Chat Window */}
        <div className="col-span-6  bg-gradient-to-tl from-yellow-200 via-white to-yellow-200  p-4 flex flex-col"></div>

        {/* Right Panel: Profile Info */}
        <div className="col-span-3  bg-gradient-to-tr from-yellow-600   shadow-md  to-yellow p-4 flex flex-col items-center"></div>
      </div>
    </div>
  );
};

export default HomePage;
