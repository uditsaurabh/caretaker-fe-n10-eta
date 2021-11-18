import axios from "axios";

const secureAxios = axios.create({
  baseURL: "https://stark-island-21254.herokuapp.com/",
  headers: {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  },
});

export default secureAxios;
