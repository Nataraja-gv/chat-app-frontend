import React from "react";

export const Reducer = (state, action) => {
  switch (action.type) {
    case "fullName":
      return {
        ...state,
        fullname: action.payload,
      };
    case "phone":
      return {
        ...state,
        phone: action.payload,
      };

    case "email":
      return {
        ...state,
        email: action.payload,
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

export const Step1 = ({ action, dispatch }) => {
  return <div>  <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-md border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-md border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-md border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </form></div>;
};
export const Step2 = ({ action, dispatch }) => {
  return <div> <div>
                <label
                  htmlFor="about"
                  className="block mb-2 text-sm font-medium text-yellow-500"
                >
                  About
                </label>
                <textarea
                  id="about"
                  rows={4}
                  className="block w-full p-3 text-sm text-gray-600 bg-gray-50 rounded-lg border border-yellow-300  focus:border-yellow-500"
                  placeholder="Tell us something about yourself..."
                ></textarea>
              </div></div>;
};

export const Step3 = ({ action, dispatch }) => {
  return <div> <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-yellow-400 rounded-lg cursor-pointer bg-yellow-50 hover:bg-yellow-100 transition"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-yellow-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-600">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF (Max 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div></div>;
};
