import axios from "axios";
import { BASE_URL } from "./constatns";

const instance = axios.create({
  baseURL: BASE_URL,
});
let i = 0;

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  //checking if accessToken exists
  console.log(++i)
  if (accessToken) {
    config.headers = config.headers ?? {};
    config.headers["authorization"] = accessToken;
  }
  return config;
});

instance.interceptors.response.use((res => res), err => {
  console.log(err)
  console.log(err.config)
  // if(err.status === 401 && err.data.name === 'TokenExpiredError'){

  // }
  return Promise.reject(err);
})

export default instance;
