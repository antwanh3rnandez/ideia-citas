import { AppBar, Container, Toolbar } from "@mui/material"
import ideiaLogo from '../assets/logo.svg'
import { ReactNode } from "react"

export const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <AppBar position='static'>
                <Container maxWidth='sm'>
                    <Toolbar disableGutters>
                        {/* <Typography sx={{marginX: 'auto'}} variant='h6' textAlign={'center'}>Agenda tu cita</Typography> */}
                        <img src={ideiaLogo} alt='logo toi' className='logo' />
                    </Toolbar>
                </Container>
            </AppBar>
            <Container sx={{ marginTop: '25px' }} maxWidth='sm'>
                {children}
            </Container>
        </>

    )
}
