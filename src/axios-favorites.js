import axios from "axios";

const instance = axios.create({
  baseURL: "https://quotes-ac4f5-default-rtdb.firebaseio.com",
});

export default instance;
