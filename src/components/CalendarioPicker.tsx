import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs, { Dayjs, ManipulateType } from "dayjs"
import { CalendarioCitaProps } from "../App";

function maxDate(number: number, type: ManipulateType): Dayjs {
    const today = dayjs();
    const maxDate = today.add(number, type);
    return maxDate;
}

function minDate(maxHour: number): Dayjs {
    const today = dayjs();
    if (today.hour() >= (maxHour - 1)) {
        const minDate = today.add(1, 'day');
        return minDate;
    }
    return today;
}
// TODO: disabled days and hour if is not available

export const CalendarioPicker = ({cita, setCita}: CalendarioCitaProps) => {

    const handleDateChange = (date: Dayjs | null) => {
        const formattedDay = dayjs(date).format('dddd DD MMMM YYYY');
        setCita({
            ...cita,
            fecha: formattedDay
        })
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar 
                views={['day']} 
                minDate={minDate(21)} 
                maxDate={maxDate(2, 'weeks')} 
                onChange={handleDateChange} 
            />
        </LocalizationProvider>
    )
}
