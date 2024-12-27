import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://13.124.86.133:8080/test", // Spring Boot 서버 URL
  withCredentials: true, // 쿠키를 포함하여 요청
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      alert("Session expired. Please log in again.");
      window.location.href = "/login"; // 인증 실패 시 로그인 페이지로 리디렉션
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
