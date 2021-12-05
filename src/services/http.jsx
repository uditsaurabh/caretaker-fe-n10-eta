import axios from "axios";

const url = process.env.REACT_APP_SERVER_URL;
const secureAxios = axios.create({
  baseURL: url,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${localStorage.getItem("user")}`,
  },
});

export default secureAxios;
