import axios from "axios";

const api = axios.create({
  baseURL: "https://next-js-backend-wexa.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;