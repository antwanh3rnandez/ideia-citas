import { Box, Button, Collapse, Grid, TextField, Typography } from '@mui/material'
import { CalendarioPicker } from './components/CalendarioPicker'
import { HoraPicker } from './components/HoraPicker';
import { useEffect, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { StepsBar } from './components/StepsBar';
import { createCita } from './helpers/createCita';
import writingGif from './assets/writing.gif';
import dayjs from 'dayjs';

export interface CitaProps {
  fecha: string;
  hora: string;
  datos: {
    nombre: string;
    telefono: string;
  }
}

export interface CalendarioCitaProps {
  cita: CitaProps;
  setCita: React.Dispatch<React.SetStateAction<CitaProps>>;
}

function firstName(name: string): string {
  const nameArray = name.split(' ');
  return nameArray[0];
}


export const App = () => {

  const urlParams = new URLSearchParams(window.location.search);
  const uidManychat = urlParams.get('uid_manychat');
  const destino = urlParams.get('destino');


  const [cita, setCita] = useState<CitaProps>({
    fecha: '',
    hora: '',
    datos: {
      nombre: '',
      telefono: '',
    }
  })
  const [numberStep, setNumberStep] = useState(0);
  const [actualStep, setActualStep] = useState('dia');

  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  useEffect(() => {
    if (actualStep === 'dia') {
      if (cita.fecha === '') {
        return;
      }
      setActualStep('hora');
      setNumberStep(1);
    }
    if (actualStep === 'hora') {
      if (cita.hora === '') {
        return;
      }
      setActualStep('datos');
      setNumberStep(2);
    }

    if (actualStep === 'confirmado') {
      setTimeout(() => {
        window.close();
        window.location.href = destino ? destino : 'https://ideia.com.mx/';
      }, 5000);
    }

  }, [cita, actualStep, destino]);

  const handleBack = () => {
    if (actualStep === 'hora') {
      setCita({
        ...cita,
        fecha: ''
      });
      setActualStep('dia');
      setNumberStep(0);
    }

    if (actualStep === 'datos') {
      setCita({
        ...cita,
        hora: ''
      });
      setActualStep('hora');
      setNumberStep(1);
    }

    if (actualStep === 'confirmacion') {
      setActualStep('datos');
      setNumberStep(2);
    }
  }

  const handleSaveDatos = () => {
    let error = false;
    if (cita.datos.nombre === '' || cita.datos.nombre.length < 3) {
      setNameError(true);
      error = true;
    } else {
      setNameError(false);
    }

    if (cita.datos.telefono === '' || cita.datos.telefono.length < 10) {
      setPhoneError(true);
      error = true;
    } else {
      setPhoneError(false);
    }

    if (error) {
      return;
    }
    setActualStep('confirmacion');
    setNumberStep(3);
  }

  const handleSubmit = async () => {
    setActualStep('confirmando');
    setNumberStep(4);
    console.log('submit');
    const dateToSave = dayjs(cita.fecha).format('YYYY-MM-DD');
    const data = {
      uid_manychat: (uidManychat) ? uidManychat : 'NO_UID_PROPORCIONADO',
      name: cita.datos.nombre,
      phone: cita.datos.telefono,
      day: dateToSave,
      hour: cita.hora
    };
    const response = await createCita(data);

    if (response == 'error') {
      setActualStep('error');
      return;
    } else {
      setTimeout(() => {
        setActualStep('confirmado');
      }, 3000);
    }
    return;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h4' align='center'>Agenda tu cita</Typography>
      </Grid>
      <Grid item xs={12}>
        <StepsBar numberStep={numberStep} />
      </Grid>
      <Grid item xs={12}>
        <TransitionGroup>
          {
            actualStep === 'dia' && (
              <Collapse>
                <Typography variant='h6' align='center'>Elige un día y hora, nosotros nos contactaremos contigo.</Typography>
                <CalendarioPicker
                  cita={cita}
                  setCita={setCita}
                />
              </Collapse>

            )
          }
          {
            actualStep === 'hora' && (
              <Collapse>
                <Typography variant='h6' align='center'>Elige una hora para el día {cita.fecha}</Typography>
                <HoraPicker
                  cita={cita}
                  setCita={setCita}
                />
              </Collapse>
            )
          }
          {
            actualStep === 'datos' && (
              <Collapse>
                <Typography variant='h6' align='center'>Confirma tus datos</Typography>
                <Box sx={{ marginTop: '15px' }}>
                  <TextField
                    type='text'
                    value={cita.datos.nombre}
                    onChange={(e) => setCita({
                      ...cita,
                      datos: {
                        ...cita.datos,
                        nombre: e.target.value
                      }
                    })}
                    variant='outlined'
                    label='Nombre'
                    fullWidth
                    error={nameError}
                    helperText={nameError ? 'Mmh parece haber algún problema' : ''}
                  />
                </Box>
                <Box sx={{ marginTop: '15px' }}>
                  <TextField
                    type='tel'
                    variant='outlined'
                    label='Teléfono'
                    fullWidth
                    onChange={(e) => setCita({
                      ...cita,
                      datos: {
                        ...cita.datos,
                        telefono: e.target.value
                      }
                    })
                    }
                    value={cita.datos.telefono}
                    error={phoneError}
                    helperText={phoneError ? 'Mmh parece haber algún problema' : ''}
                  />
                </Box>
                <Button variant='contained' onClick={handleSaveDatos} sx={{ marginTop: '15px' }} fullWidth>Confirmar</Button>

              </Collapse>
            )
          }
          {
            actualStep === 'confirmacion' && (
              <Collapse>
                <Box height={350} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                  <Typography variant='h6' align='center'>¡Gracias {firstName(cita.datos.nombre)}!</Typography>
                  <Typography variant='h6' align='center'>Llamaremos al {cita.datos.telefono} el día {cita.fecha} a las {cita.hora} horas. ¿De acuerdo?</Typography>
                </Box>
              </Collapse>

            )
          }
          {
            actualStep === 'confirmando' && (
              <Collapse>
                <Box height={350} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                  <img src={writingGif} alt='loading' height={150} />
                  <Typography variant='h6' align='center'>Estamos confirmando tu cita</Typography>
                </Box>
              </Collapse>
            )
          }
          {
            actualStep === 'confirmado' && (
              <Collapse>
                <Box height={350} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                  {/* <IconCircleCheckFilled color="green" size={70} /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-check-filled" width="60" height="60" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="#2fb344" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" stroke-width="0" fill="#74b816"></path>
                  </svg>
                  <Typography variant='h6' align='center'>¡Listo! Tu cita ha sido agendada</Typography>
                  <Typography variant='h6' align='center'>Te llamaremos el día {cita.fecha} a las {cita.hora} horas.</Typography>
                  <Typography variant='body1' align='center'>Si esta ventana no se cierra automaticamente, cierrala y vuelve al chat. </Typography>
                </Box>
              </Collapse>
            )
          }
          {
            actualStep === 'error' && (
              <Collapse>
                <Box height={350} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                  {/* <IconCircleCheckFilled color="green" size={70} /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="rgba(203, 37, 4, 1)">
                    <path d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                  </svg>
                  <Typography variant='h6' align='center'>¡Ups! Algo salió mal, por favor intenta de nuevo más tarde.</Typography>
                </Box>
              </Collapse>
            )
          }
        </TransitionGroup>

      </Grid>
      {
        (actualStep === 'hora' || actualStep === 'datos') && (
          <Grid item xs={12}>
            <Button
              variant='contained'
              color='secondary'
              fullWidth
              onClick={handleBack}
            >
              Volver
            </Button>
          </Grid>
        )
      }
      {
        actualStep === 'confirmacion' && (
          <>
            <Grid item xs={4}>
              <Button
                fullWidth
                variant='contained'
                color='secondary'
                onClick={handleBack}
              >
                Volver
              </Button>
            </Grid>
            <Grid item xs={8}>
              <Button variant='contained' onClick={handleSubmit} fullWidth>Agendar cita</Button>
            </Grid>
          </>
        )
      }

      <Grid item xs={12}>
        <Typography variant='body1' align='center'>¿Tienes dudas? <a href='https://wa.me/521ideia'>Contáctanos</a></Typography>
      </Grid>
    </Grid>
  )
}

export default App
