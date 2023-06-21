import { useEffect, useState } from "react";
import { CreateCitaRequest } from "../interfaces/citas";
import { createCita } from "../helpers/createCita";

export const useFetchCreateCita = (data: CreateCitaRequest) => {

    const [state, setState] = useState({
        data: [],
        loading: true,
    });

    useEffect(() => {
        createCita(data)
            .then(data => {
                setState({
                    data,
                    loading: false,
                })
            })
    }, [data]);

    return state;

}
