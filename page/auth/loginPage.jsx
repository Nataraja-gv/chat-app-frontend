"use client";
import React from "react";
import Image from "next/image";

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white-400 to-yellow-400 text-white px-4">
      <div className="flex flex-col md:flex-row items-center max-w-5xl w-full p-6 bg-transparent rounded-xl shadow-2xl">
        {/* Left Section - Logo and App Name */}
        <div className="flex-1 flex flex-col items-center justify-center mb-8 md:mb-0">
          <Image
            src="https://freshcartdev.s3.eu-north-1.amazonaws.com/Chatapp-removebg-preview.png"
            alt="ChatApp Logo"
            width={200}
            height={200}
            className="mb-4"
          />
          {/* <h1 className="text-4xl font-semibold">ChatApp</h1> */}
        </div>

        {/* Right Section - Sign Up Form */}
        <div className="flex-1 bg-yellow/400 backdrop-blur-md p-8 rounded-xl border border-yellow-900 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-black">Login</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-md bg-white-800 border-2 border-yellow-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-md bg-white-800 border-2 border-yellow-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
           
            <div className="flex items-center">
              <input type="checkbox" id="terms" className="mr-2 bg-amber-400"  />
              <label htmlFor="terms" className="text-sm text-yellow-900">
                Agree to the{" "}
                <a href="#" className="underline text-black">
                  terms of use
                </a>{" "}
                &{" "}
                <a href="#" className="underline text-black">
                  privacy policy
                </a>
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-2 bg-yellow-600  rounded-md font-semibold text-white"
            >
              Login
            </button>
            <p className="text-sm text-black text-center mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-yellow-900 underline">
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
