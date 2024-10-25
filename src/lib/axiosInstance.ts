import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      const res = await axios.post("http://localhost:3000/api/refresh-token", {
        refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
