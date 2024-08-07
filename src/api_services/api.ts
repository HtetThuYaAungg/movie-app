import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const testingUrl = "https://movie-app-backend-v6g9.onrender.com" 
const devUrl = "http://192.168.98.254:3000"

const apiInstance: AxiosInstance = axios.create({
  baseURL: testingUrl,
  timeout: 180000, // 3 mins
  headers: {
    "Content-Type": "application/json",
  },
});

const setAuthToken:any = async (config: AxiosRequestConfig) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  } catch (error:any) {
    throw new Error('Failed to set auth token: ' + error.message);
  }
};

apiInstance.interceptors.request.use(setAuthToken);

export default apiInstance;
