import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
    'Día',
    'Hora',
    'Datos',
    'Confirmar'
];

interface StepsBarProps {
    numberStep: number;
}

export const StepsBar = ({numberStep}: StepsBarProps) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={numberStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}