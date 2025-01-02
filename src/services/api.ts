import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log(import.meta.env.REACT_APP_API_URL);
// Define a more specific type for the error response if possible
interface ErrorResponse {
  status: number;
  data: unknown;
}

const errorHandler = (error: AxiosError<ErrorResponse>) => {
  const statusCode = error.response?.status;
  if (error.code === "ERR_CANCELED") {
    console.error("API canceled!");
    return Promise.resolve();
  }

  // Log other errors
  if (statusCode) {
    if (statusCode === 403) {
      toast.error("User has insufficient permissions to access this resource");
      return "User has insufficient privileges";
    }
    const errorMessage =
      typeof error?.response?.data === "string"
        ? error.response.data
        : "An error occurred";

    console.error(errorMessage);
    toast.error(errorMessage);
    return errorMessage;
  }

  return Promise.reject(error?.response?.data || "An error occurred");
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const statusCode = error.response?.status;
    if (statusCode === 403) {
      toast.error("User has insufficient privileges");
      return "User has insufficient privileges";
    }
    errorHandler(error);
    return Promise.reject(error);
  }
);

export default api;
