import axios from "axios";

const baseURL = "http://localhost:8000/api/v1";
const proCitasApi = axios.create({
    baseURL,
    headers: {
        Accept: "application/json",
    },
});

export default proCitasApi;