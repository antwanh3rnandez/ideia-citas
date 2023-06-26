import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api/v1";
const proCitasApi = axios.create({
    baseURL,
    headers: {
        Accept: "application/json",
    },
});

export default proCitasApi;