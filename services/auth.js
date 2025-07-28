import axios from "@/utils/axiosInstance";
import { enqueueSnackbar } from "notistack";

export const signupAuth = async (data) => {
  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url:"/backend/user/register",
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
