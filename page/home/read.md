"use client";
import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-yellow-400 text-white flex items-center justify-center p-2">
      <div className="grid grid-cols-12 w-full max-w-[1400px] h-[700px] border border-gray-700 rounded-2xl overflow-hidden">

        {/* Left Panel: Sidebar */}
        <div className="col-span-3 bg-gradient-to-b from-gray-900 to-black p-4 space-y-4">
          <div className="text-2xl font-bold text-blue-400 mb-2">QuickChat</div>
          <input
            type="text"
            placeholder="Search User..."
            className="w-full p-2 rounded-full bg-gray-800 text-white placeholder-gray-400"
          />

          <div className="space-y-2 mt-4 overflow-y-auto h-[520px]">
            {/* Mock users */}
            {["GreatStack", "halo", "Thái", "sandeep", "ak", "prem", "Ibrahim"].map((user, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700 cursor-pointer"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold">
                  {user[0]}
                </div>
                <div className="flex flex-col">
                  <span>{user}</span>
                  <span className={`text-sm ${i % 2 === 0 ? "text-green-400" : "text-gray-400"}`}>
                    {i % 2 === 0 ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Panel: Chat Window */}
        <div className="col-span-6 bg-black bg-opacity-80 p-4 flex flex-col">
          {/* Header */}
          <div className="border-b border-gray-600 pb-2 mb-2 flex justify-between items-center">
            <div className="text-xl font-semibold">GreatStack</div>
            <button className="text-gray-400 hover:text-white">ⓘ</button>
          </div>

          {/* Messages Body (mock) */}
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Chat area goes here
          </div>
        </div>

        {/* Right Panel: Profile Info */}
        <div className="col-span-3 bg-gradient-to-b from-gray-900 to-black p-4 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-white mb-4 flex items-center justify-center text-black text-2xl font-bold">
            G
          </div>
          <h2 className="text-lg font-bold">GreatStack</h2>
          <p className="text-sm text-gray-400 mb-6">Hi Everyone, I am Using QuickChat</p>

          <div className="w-full border-t border-gray-700 pt-4">
            <h3 className="text-md font-semibold text-gray-300 mb-2">Media</h3>
            <p className="text-gray-500 text-sm">No media shared yet.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomePage;
