"use client";
import React, { useReducer, useState } from "react";
import Image from "next/image";
import { reducer, Step1, Step2, Step3 } from "./reducerField";
import { useSnackbar } from "notistack";
import { otpApi, otpApiVerify, signupAuth } from "@/services/auth";
import { useRouter } from "next/navigation";
import OtpModel from "@/section/otpmodel";

export const Signup = () => {
  const [step, setStep] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const steps = [
    { id: 1, label: "Personal Info" },
    { id: 2, label: "About Info" },
    { id: 3, label: "Upload Image" },
  ];
  const [state, dispatch] = useReducer(reducer, {
    fullName: "",
    email: "",
    phone: "",
    photoUser: "",
    about: "",
  });
  const [openModel, setOpenModel] = useState(false);

  const handleDispatchInput = (key, value) => {
    dispatch({ type: key, payload: value });
  };

  const handleOtpVerify = async (code) => {
    try {
      const res = await otpApiVerify(Number(code));
      if (res) {
        enqueueSnackbar("Register successful", { variant: "success" });
        router.push("/home");
        return true; // ✅ verification success
      }
    } catch (error) {
      enqueueSnackbar(error?.message || "OTP verification failed", {
        variant: "error",
      });
      return false; // ❌ verification failed
    }
  };

  const handleSubmit = async () => {
    if (!state?.photoUser) {
      enqueueSnackbar("photo is required", { variant: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("fullName", state.fullName);
    formData.append("email", state?.email);
    formData.append("phone", state?.phone);
    formData.append("about", state?.about);
    formData.append("photoUser", state?.photoUser);
    try {
      const res = await signupAuth(formData);
      if (res) {
        const userId = res?.data?._id;
        localStorage.setItem("userId", userId);
        if (userId) {
          const res = await otpApi(userId);
          if (res) {
            enqueueSnackbar("otp send successful to your Emailid", {
              variant: "success",
            });
            setOpenModel(true);
          }
        }
      }
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  };

  const handleStepField = (step) => {
    if (step === 1) {
      if (!state?.fullName || !state?.email || !state?.phone) {
        enqueueSnackbar("All fields are required", { variant: "error" });
      } else {
        setStep(step + 1);
      }
    } else if (step === 2) {
      if (!state?.about) {
        enqueueSnackbar("About field is required", { variant: "error" });
      } else {
        setStep(step + 1);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-300 px-4 py-10">
      <div className="flex flex-col md:flex-row items-center w-full max-w-6xl bg-white/90 rounded-2xl shadow-2xl overflow-hidden p-6 md:p-10">
        {/* Left Logo */}
        <div className="flex flex-col items-center w-[350px] justify-center p-4">
          <Image
            src="https://freshcartdev.s3.eu-north-1.amazonaws.com/Chatapp-removebg-preview.png"
            alt="ChatApp Logo"
            width={180}
            height={180}
            className="mb-4"
          />{" "}
          <p className="text-sm text-black text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-yellow-900 underline">
              Login here
            </a>
          </p>
        </div>

        {/* Right Side */}
        <div className="flex-1 w-full bg-white p-6 md:p-10 rounded-xl border border-yellow-400 shadow-md">
          <h2 className="text-3xl font-bold text-center text-yellow-700 mb-6">
            Sign Up
          </h2>

          {/* Stepper */}
          <ol className="flex justify-between items-center w-full text-sm font-medium text-yellow-700 bg-yellow-100 border border-yellow-300 rounded-lg shadow-inner p-4 mb-8">
            {steps.map((s, index) => (
              <li
                key={s.id}
                onClick={() => setStep(s.id)}
                className={`flex items-center font-semibold cursor-pointer transition-colors duration-200 ${
                  step === s.id ? "text-yellow-700" : "text-gray-500"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-6 h-6 mr-2 text-xs border-2 rounded-full ${
                    step === s.id
                      ? "border-yellow-600 text-yellow-600"
                      : "border-gray-400 text-gray-400"
                  }`}
                >
                  {s.id}
                </span>
                {s.label}
                {index < steps.length - 1 && (
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </li>
            ))}
          </ol>

          {/* Step Content */}
          <div className="text-gray-700 w-fill h-[300px] text-base">
            {step === 1 && (
              <Step1 state={state} handleDispatchInput={handleDispatchInput} />
            )}

            {step === 2 && (
              <Step2 state={state} handleDispatchInput={handleDispatchInput} />
            )}

            {step === 3 && <Step3 state={state} dispatch={dispatch} />}
          </div>
          <div className="flex justify-between items-center mt-6">
            {step < 3 && (
              <div className="flex gap-4">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={() => handleStepField(step)}
                  className="px-6 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
                >
                  Continue
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="flex gap-4">
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
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
