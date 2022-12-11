import axios from "axios";
import { baseURL } from "../config";
import { message } from "antd";

const api = axios.create({
  baseURL,
});

api.interceptors.response.use((res) => {
  console.log("res");
  if (res.data.code === 200) {
    return res.data;
  } else {
    message.error(res.data.message);
    return null;
  }
});
