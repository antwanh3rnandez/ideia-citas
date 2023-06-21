import { useFetchGetCitas } from "./hooks/useFetchGetCitas";
import { AllCitasArr } from "./interfaces/citas.response";

interface FetchProps{
    data: AllCitasArr[] | null;
    loading: boolean;
}

export const Show = () => {

    const { 
        data: citas, 
        loading 
    }: FetchProps = useFetchGetCitas();

    console.log(citas);

    return (
        <div>
            <h1>Mostrar citas</h1>
            <hr />
            {
                loading ? <p>Cargando...</p> : null
            }
            {
                citas.map(cita => (
                    <div key={cita.id}>
                        <p>{cita.created_at}</p>
                        <p>{cita.name}</p>
                        <p>{cita.phone}</p>
                        <p>{cita.day}</p>
                        <p>{cita.hour}</p>
                    </div>
                ))
            }       
        </div>
    )
}
