import axios from "axios";
const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : "https://pencil-io.vercel.app/",
  timeout: 8000,
  headers: {
    Accept: "application/json",
  },
});

export default axiosInstance;
