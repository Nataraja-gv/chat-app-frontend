"use client";
import { fecthuser } from "@/services/auth";
import { EllipsisVertical, Search } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [user, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fecthuser();
        if (res) {
          setUser(res?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  const selected_user = user?.find((user) => user?._id === selectedUser);
  console.log(selected_user, "uuuuu");

  return (
    <div className="min-h-screen bg-yellow-400 text-white flex items-center justify-center p-4">
      <div className="grid grid-cols-12 w-full max-w-[1400px] h-[700px] border border-yellow-900 rounded-2xl overflow-hidden shadow-xl">
        {/* Left Sidebar */}
        <div className="col-span-3 bg-gradient-to-b from-yellow-600 to-yellow-500 px-4 py-4 flex flex-col">
          {/* Logo and Menu */}
          <div className="flex justify-between items-center mb-4">
            <Image
              src="https://freshcartdev.s3.eu-north-1.amazonaws.com/Chatapp-removebg-preview.png"
              alt="ChatApp Logo"
              width={80}
              height={80}
            />
            <EllipsisVertical color="black" />
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-2 bg-white border border-yellow-800 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-yellow-600 transition-all duration-200">
            <Search size={20} color="black" strokeWidth={2} />
            <input
              type="text"
              placeholder="Search User..."
              className="flex-1 p-1 outline-none bg-transparent text-black placeholder-gray-500"
            />
          </div>

          {/* User List */}
          <div className="space-y-4 mt-6 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-800 scrollbar-track-transparent">
            {user?.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-4 py-2 rounded-3xl bg-gradient-to-tl from-yellow-400  to-yellow-900 hover:from-yellow-800/50 hover:to-yellow-900/50 transition-all duration-200 cursor-pointer"
              >
                <div
                  className="flex items-center gap-4"
                  onClick={() => setSelectedUser(user?._id)}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-yellow-700 bg-yellow-700">
                    <img
                      src={
                        user?.photoUser ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt={user?.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col text-white">
                    <span className="text-[15px] font-semibold capitalize">
                      {user?.fullName}
                    </span>
                    {/* <span className="text-xs text-gray-400">Offline</span> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Chat Window */}
        <div className="col-span-6 bg-gradient-to-tr from-yellow-200 via-white to-yellow-100  flex flex-col  ">
          <div className="flex  items-center gap-4 bg-amber-300 p-3 border-b-2 border-yellow-950  shadow-2xl">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-yellow-700 bg-yellow-700 ">
              <img
                src={
                  selected_user?.photoUser ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt={selected_user?.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-black capitalize font-bold">
              {selected_user?.fullName}
            </h1>
          </div>
        </div>

        {/* Right Profile Info */}
        <div className="col-span-3 bg-gradient-to-b from-yellow-600 to-yellow-500 p-6 flex flex-col items-center justify-between text-white   shadow-inner">
          {selected_user ? (
            <>
              {/* User Profile Info */}
              <div className="flex flex-col items-center gap-4 mt-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-300 shadow-lg">
                  <img
                    src={
                      selected_user?.photoUser ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt={selected_user?.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold capitalize">
                    {selected_user?.fullName}
                  </h2>
                  <p className="text-sm text-white/90">
                    {selected_user?.email}
                  </p>
                  <p className="text-xs text-white/70 mt-1">
                    📱 {selected_user?.phone}
                  </p>
                </div>
              </div>

              {/* Media Placeholder */}
              <div className="w-full mt-8 text-left">
                <h3 className="text-sm font-semibold border-b border-white/30 pb-1 mb-2">
                  Media
                </h3>
                <p className="text-xs text-white/60">No media yet.</p>
              </div>

              {/* Logout Button */}
              <button
                className="w-full mt-auto bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold py-2 rounded-full transition-all"
                onClick={() => alert("Logout logic here")}
              >
                Logout
              </button>
            </>
          ) : (
            <p className="text-center text-white/70 mt-20">
              Select a user to view profile.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
