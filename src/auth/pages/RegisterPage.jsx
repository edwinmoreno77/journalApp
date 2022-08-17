import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';


const formData = {
    email: '',
    password: '',
    displayName: '',
}

const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe tener @'],
    password: [(value) => value.length > 5, 'La contraseña debe tener mas de 5 caracteres'],
    displayName: [(value) => value.length > 3, 'El nombre debe tener mas de 3 caracteres'],
}


export const RegisterPage = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);

    const {
        formState, email, displayName, password, onInputChange,
        isFormValid, emailValid, displayNameValid, passwordValid,
    } = useForm(formData, formValidations);

    // console.log(displayNameValid);

    const onSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        console.log(formState);
    }

    return (
        <AuthLayout title='Crear Cuenta'>
            {/* <h1>Formulario: {isFormValid ? 'completado' : 'incompleto'}</h1> */}


            <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Nombre completo"
                            type='text'
                            placeholder='Pedro Perez'
                            fullWidth
                            name='displayName'
                            value={displayName}
                            onChange={onInputChange}
                            error={!!displayNameValid && formSubmitted}
                            helperText={displayNameValid}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Correo"
                            type='email'
                            placeholder='correo@gmail.com'
                            fullWidth
                            name='email'
                            value={email}
                            onChange={onInputChange}
                            error={!!emailValid && formSubmitted}
                            helperText={emailValid}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Contraseña"
                            type='password'
                            placeholder='********'
                            fullWidth
                            name='password'
                            value={password}
                            onChange={onInputChange}
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} >
                            <Button
                                type='submit'
                                variant="contained"
                                fullWidth>
                                Crear Cuenta
                            </Button>
                        </Grid>

                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Typography sx={{ mr: 2 }}>¿Ya tienes una cuenta?</Typography>
                        <Link component={RouterLink} color='inherit' to="/auth/login">
                            ingresar
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>

    )
}
