import axios from "axios";

const customFetch = axios.create({
  // baseURL: "http://127.0.0.1:5000",
  baseURL: "http://18.214.36.46",
  headers: {
    "Content-Type": "application/json",
  },
});

export default customFetch;