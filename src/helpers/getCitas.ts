import proCitasApi from "../api/procitas.api";


export const getCitas = async () => {
    const resp = await proCitasApi.get("/citas");

    const { data } = resp;

    return data.data;
}
