 "use client";
import { updateProfile, userProfile } from "@/services/auth";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    about: "",
    email: "",
    phone: "",
    photoUser: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userProfile();
        setProfile(res?.data);
        setFormData(res?.data);
      } catch (error) {
        console.error(error?.message);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        fullName: formData.fullName,
        about: formData.about,
      });
      enqueueSnackbar("Profile updated successfully!", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Failed to update profile.", { variant: "error" });
    }
  };

  if (!profile) {
    return (
      <div className="text-center text-lg text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-300 to-orange-400 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full space-y-4"
      >
        <div className="text-center">
          <img
            src={formData.photoUser || "/default-avatar.png"}
            alt={formData.fullName}
            className="w-28 h-28 rounded-full border-4 border-yellow-500 mx-auto object-cover mb-3"
          />
          <h2 className="text-xl font-bold text-gray-800">Update Profile</h2>
        </div>

        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          disabled
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          disabled
          placeholder="Phone Number"
          className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
        />
        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          placeholder="About"
          className="w-full border border-gray-300 rounded-lg p-2"
        ></textarea>

        <div className="flex justify-between space-x-4">
          <button
            type="button"
            onClick={() => router.push("/home")}
            className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg"
          >
            Back to Chat
          </button>
          <button
            type="submit"
            className="w-1/2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
