import axios from "axios";

const customFetch = axios.create({
  // baseURL: "http://172.24.221.37:5000",
  baseURL: "http://18.214.36.46",
  headers: {
    "Content-Type": "application/json",
  },
});

customFetch.interceptors.response.use(
  function (response) {
    if(response?.data?.token){
      const newToken = response.data.token;
      localStorage.setItem("token", newToken);
    }
    return response;
  },
  function (error) {
    console.log("error in axios interceptors!");
    return Promise.reject(error);
  }
);

export default customFetch;