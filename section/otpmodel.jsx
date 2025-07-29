"use client";

import { otpApi } from "@/services/auth";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

const OtpModal = ({ open, setOpen, handleOtpVerify }) => {
  const [otpCode, setOtpCode] = useState(null);
  const [resendTimer, setResendTimer] = useState(0);
  if (!open) return null;
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;
    try {
      const userId = localStorage.getItem("userId");
      const res = await otpApi(userId);
      if (res) {
        setResendTimer(30);
        enqueueSnackbar("otp send successful to your Emailid", {
          variant: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-white/20 backdrop-blur-md transition-all"
      aria-hidden={!open}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Enter OTP
            </h3>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 14 14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal body */}
          <div className="p-4 md:p-5">
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="otp"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  onChange={(e) => setOtpCode(e.target.value)}
                  maxLength={4}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="1234"
                  required
                />
              </div>
              <div className="">
                <h1
                  onClick={handleResendOTP}
                  className={`text-end capitalize cursor-pointer ${
                    resendTimer > 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-yellow-600 hover:underline"
                  }`}
                >
                   {resendTimer > 0
                    ? `Resend OTP in ${resendTimer}s`
                    : "Resend OTP"}
                </h1>
              </div>

              <button
                type="submit"
                onClick={async (e) => {
                  e.preventDefault();
                  const success = await handleOtpVerify(otpCode);
                  if (success) {
                    setOpen(false); //
                  }
                }}
                className="w-full text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
              >
                Verify OTP
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
