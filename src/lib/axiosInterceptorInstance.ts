import { config } from "@/config/config";
import { getAccessToken, logout } from "@/utils/commonFunction";
import axios from "axios";

const baseURL = config.backendUrl;

const axiosInterceptorInstance = axios.create({
  baseURL,
});

// Request interceptor
axiosInterceptorInstance.interceptors.request.use(
  async (config) => {
    // Modify the request config here (add headers, authentication tokens)
    const accessToken = await getAccessToken("access-token");
    if (accessToken?.value) {
      config.headers.Authorization = `Bearer ${accessToken.value}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);
const handleLogout = async () => {
  const tokenremove: any = await getAccessToken("access-token");
  await logout(tokenremove);
};

axiosInterceptorInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 error, e.g., redirect to login or refresh token
      await handleLogout();
    }
    return Promise.reject(error);
  }
);

export default axiosInterceptorInstance;
