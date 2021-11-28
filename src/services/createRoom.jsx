import axios from "axios";

const url = process.env.REACT_APP_DYTE_URL;
const callRoom = axios.create({
  baseURL: url,
  title: "Consultation",
  authorization: { waitingRoom: true },
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "8bb9c4e4a9b1488f8435",
  },
});

export default callRoom;
