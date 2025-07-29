"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSnackbar } from "notistack";
import { LoginAuth, otpApiVerify } from "@/services/auth";
import OtpModel from "@/section/otpmodel";
import { useRouter } from "next/navigation";

export const LoginPage = () => {
  const [userData, setUserData] = useState({
    email: "",
    fullName: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const [openModel, setOpenModel] = useState(false);
  const router = useRouter();

  const handleInput = (key, value) => {
    setUserData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.fullName) {
      return enqueueSnackbar("Full Name is required", { variant: "error" });
    }
    if (!userData.email) {
      return enqueueSnackbar("Email is required", { variant: "error" });
    }

    try {
      const res = await LoginAuth(userData);
      if (res) {
        const userId = res?.data?.userId;
        localStorage.setItem("userId", userId);
        setOpenModel(true);
      }
    } catch (error) {
      enqueueSnackbar(error?.message || "Login error", { variant: "error" });
    }
  };
  const handleOtpVerify = async (code) => {
    try {
      const res = await otpApiVerify(Number(code));
      if (res) {
        enqueueSnackbar("login successful", { variant: "success" });
        router.push("/");
        return true; // ✅ verification success
      }
    } catch (error) {
      enqueueSnackbar(error?.message || "OTP verification failed", {
        variant: "error",
      });
      return false; // ❌ verification failed
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-400 text-white px-4">
      <div className="flex flex-col md:flex-row items-center max-w-5xl w-full p-6 bg-transparent rounded-xl shadow-2xl">
        {/* Left Section */}
        <div className="flex-1 flex flex-col items-center justify-center mb-8 md:mb-0">
          <div className="mb-4">
            <Image
              src="https://freshcartdev.s3.eu-north-1.amazonaws.com/Chatapp-removebg-preview.png"
              alt="ChatApp Logo"
              width={200}
              height={200}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-yellow-100 backdrop-blur-md p-8 rounded-xl border border-yellow-900 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-black">Login</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              value={userData.fullName}
              onChange={(e) => handleInput("fullName", e.target.value)}
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-md bg-white border-2 border-yellow-900 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="email"
              value={userData.email}
              onChange={(e) => handleInput("email", e.target.value)}
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-md bg-white border-2 border-yellow-900 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            <div className="flex items-center">
              <input type="checkbox" id="terms" className="mr-2" />
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
              className="w-full py-3 mt-2 bg-yellow-600 rounded-md font-semibold text-white hover:bg-yellow-700"
            >
              Login
            </button>

            <p className="text-sm text-black text-center mt-4">
              New user?{" "}
              <a href="/signup" className="text-yellow-900 underline">
                Register Here
              </a>
            </p>
          </form>
        </div>
      </div>{" "}
      {openModel && (
        <OtpModel
          open={openModel}
          setOpen={setOpenModel}
          handleOtpVerify={handleOtpVerify}
        />
      )}
    </div>
  );
};
