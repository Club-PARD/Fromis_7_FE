import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/login/oauth2/code/google", // Spring Boot 서버 URL
  withCredentials: true, 
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      alert("Session expired. Please log in again.");
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
