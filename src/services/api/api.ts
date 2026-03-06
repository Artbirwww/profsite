import axios from "axios";

const isLocalNetwork = () => {
  const localIP = "192.168."
  const currentHost = window.location.hostname
  return currentHost.includes(localIP)
}
const getBaseUrl = () => {
  if (isLocalNetwork()) return import.meta.env.VITE_API_LOCAL_URL
  return import.meta.env.VITE_API_URL
}

const API_URL = getBaseUrl()
console.log(API_URL)
console.log(`Current URL : ${API_URL}`)
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api