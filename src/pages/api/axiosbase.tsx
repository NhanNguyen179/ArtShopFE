import axios from "axios";
// const https = require('https');


const axiosBase = axios.create({
  baseURL: "https://ec2-34-198-71-168.compute-1.amazonaws.com:8000/api/v1/",
});

// Add a request interceptor
axiosBase.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = localStorage.getItem("token");
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosBase.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosBase;
