import { DigitalClock, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs, { Dayjs } from "dayjs"
import { CalendarioCitaProps } from "../App";

export const HoraPicker = ({cita, setCita}: CalendarioCitaProps) => {

    const handleHourChange = (hour: Dayjs | null) => {
        const formattedHour = dayjs(hour).format('HH');
        setCita({
            ...cita,
            hora: formattedHour
        })
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DigitalClock 
                skipDisabled 
                minTime={dayjs().hour(8)} 
                maxTime={dayjs().hour(21)} 
                onChange={handleHourChange} 
                timeStep={60} 
            />
        </LocalizationProvider>
    )
}
