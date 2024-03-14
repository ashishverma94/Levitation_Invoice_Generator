import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const errorcode =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;

  if (!errorcode) {
    toast.error("Something went wrong");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
};
