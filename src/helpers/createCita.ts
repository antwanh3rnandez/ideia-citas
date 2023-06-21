import proCitasApi from "../api/procitas.api"
import { CreateCitaRequest } from "../interfaces/citas";

export const createCita = async (data: CreateCitaRequest) => {

    try {
        const resp = await proCitasApi.post("/citas", data);
        const { data: cita } = resp;
        return cita.data;
            
    } catch (error) {

        console.log(error);
        return 'error';
    }
    

}
