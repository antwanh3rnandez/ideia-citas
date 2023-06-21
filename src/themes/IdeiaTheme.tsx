import { ThemeOptions, createTheme } from '@mui/material';

export const toiTheme: ThemeOptions = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#757575',
        },
    },
    shape: {
        // borderRadius: 25,
    },
});
