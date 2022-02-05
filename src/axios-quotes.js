import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.quotable.io",
});

export default instance;
