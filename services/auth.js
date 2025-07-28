import axios from "@/utils/axiosInstance";
import { enqueueSnackbar } from "notistack";

export const signupAuth = async (data) => {
  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "/backend/user/register",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  };
  try {
    const res = await axios.request(config);
    return res?.data;
  } catch (error) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

export const otpApi = async (userId) => {
  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "/backend/user/otp",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      userId,
    },
  };
  try {
    const res = await axios.request(config);
    return res?.data;
  } catch (error) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

export const otpApiVerify = async (code) => {
  const userId = localStorage.getItem("userId");
  const data = {
    code,
    userId,
  };
  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "/backend/user/otp/verify",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };
  try {
    const res = await axios.request(config);
    return res?.data;
  } catch (error) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};
