"use client";

import { X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export const reducer = (state, action) => {
  switch (action.type) {
    case "fullName":
      return {
        ...state,
        fullName: action.payload,
      };

    case "email":
      return {
        ...state,
        email: action.payload,
      };
    case "phone":
      return {
        ...state,
        phone: action.payload,
      };
    case "photoUser":
      return {
        ...state,
        photoUser: action.payload,
      };

    case "about":
      return {
        ...state,
        about: action.payload,
      };
    default:
      return state;
  }
};

export const Step1 = ({ state, handleDispatchInput }) => {
  return (
    <div className="space-y-4">
      {" "}
      <input
        type="text"
        placeholder="Full Name"
        value={state?.fullName}
        onChange={(e) => handleDispatchInput("fullName", e.target.value)}
        className="w-full px-4 py-3 rounded-md border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      <input
        type="email"
        placeholder="Email Address"
        value={state?.email}
        onChange={(e) => handleDispatchInput("email", e.target.value)}
        className="w-full px-4 py-3 rounded-md border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={state?.phone}
        onChange={(e) => handleDispatchInput("phone", e.target.value)}
        className="w-full px-4 py-3 rounded-md border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
    </div>
  );
};
export const Step2 = ({ state, handleDispatchInput }) => {
  return (
    <div>
      <label
        htmlFor="about"
        className="block mb-2 text-sm font-medium text-yellow-500"
      >
        About
      </label>
      <textarea
        id="about"
        rows={4}
        value={state?.about}
        onChange={(e) => handleDispatchInput("about", e.target.value)}
        className="block w-full p-3 text-sm text-gray-600 bg-gray-50 rounded-lg border border-yellow-300  focus:border-yellow-500"
        placeholder="Tell us something about yourself..."
      ></textarea>
    </div>
  );
};
export const Step3 = ({ state, dispatch }) => {
  const [selectedImages, setSelectedImages] = useState(null);

  const handleimage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImages(imageUrl);
      dispatch({ type: "photoUser", payload: file });
    }
  };

  const handleimageCancel = () => {
    setSelectedImages(null);
    dispatch({ type: "photoUser", payload: null });
  };

  return (
    <div className="flex items-center justify-center w-full px-4">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full max-w-md h-72 border-2 border-dashed border-yellow-400 rounded-xl bg-yellow-50 hover:bg-yellow-100 transition duration-300 shadow-md cursor-pointer relative"
      >
        {!selectedImages ? (
          <>
            <div className="flex flex-col items-center justify-center pt-6 pb-6">
              <svg
                className="w-10 h-10 mb-3 text-yellow-500 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <p className="text-sm font-semibold text-yellow-700">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-yellow-600 mt-1">
                PNG, JPG, GIF (Max 800x400px)
              </p>
            </div>
          </>
        ) : (
          <div className="relative">
            <Image
              src={selectedImages}
              alt="Uploaded preview"
              width={160}
              height={160}
              className="rounded-lg object-cover border-4 border-yellow-300 shadow"
            />
            <button
              type="button"
              onClick={handleimageCancel}
              className="absolute top-3 right-3 bg-red-500 rounded-full p-1 hover:bg-red-600 shadow cursor-pointer"
            >
              <X color="white" size={18} />
            </button>
          </div>
        )}
        <input
          id="dropzone-file"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          onChange={handleimage}
          className="hidden"
        />
      </label>
    </div>
  );
};
