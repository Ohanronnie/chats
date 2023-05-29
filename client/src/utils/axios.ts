import axios from "axios";
let axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true
});

export {
  axiosInstance as axios
}