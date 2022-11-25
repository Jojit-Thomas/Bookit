import axios from "axios";
import { BASE_URL } from "./constants";

const instance = axios.create({
  baseURL: BASE_URL,
});

// let i = 0;
instance.interceptors.request.use((config) => {
  const adminAccessToken = localStorage.getItem("adminAccessToken");
  //checking if adminAccessToken exists
  if (adminAccessToken) {
    config.headers = config.headers ?? {};
    config.headers["authorization"] = adminAccessToken;
  }
  return config;
});

const interceptor = instance.interceptors.response.use((res => res), err => {
  console.log(err)
  if(err.response.status === 401 && err.response.data.name === 'TokenExpiredError'){
    localStorage.removeItem("adminAccessToken")    
    window.location.href = "/login"
    return Promise.reject(err);
  } else {
    return Promise.reject(err);
  }

})
export default instance;
