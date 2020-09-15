import axios from "axios";

export default axios.create({
  baseURL: "https://topfractal.com/api/v1/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("_token")}`,
  },
});
