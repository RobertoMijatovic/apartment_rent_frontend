import axios from "axios";
import store from "./store";

const instance = axios.create({
  baseURL: "http://127.0.0.1:1312/api",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") || store.state.token; 

    if (token) {
      config.headers.Authorization = token;
      console.log("Authorization Header Set:", config.headers.Authorization);
    } else {
      console.warn("No token found");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
