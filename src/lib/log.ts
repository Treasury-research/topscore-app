import axios from "axios";
import { logURL } from "../config";

export default async function log(event: string, address: string) {
  return await axios.post(`${logURL}/api/v1/trace`, {
    event,
    address,
    url: window.location.href,
  });
}
