import axios from "@/utils/axiosInstance";
import { enqueueSnackbar } from "notistack";

export const fecthuserChats = async (targetUser) => {
  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: "backend/user/chat",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      targetUser,
    },
  };
  try {
    const res = await axios.request(config);
    return res?.data?.data;
  } catch (error) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};
