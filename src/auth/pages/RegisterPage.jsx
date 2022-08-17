import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailAndPassword } from '../../store/auth';


const formData = {
    email: '',
    password: '',
    displayName: '',
}

const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe incluir @'],
    password: [(value) => value.length > 5, 'La contraseña debe tener más de 5 caracteres'],
    displayName: [(value) => value.length > 3, 'El nombre debe tener más de 3 caracteres'],
}


export const RegisterPage = () => {

    const dispatch = useDispatch();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const { status, errorMessage } = useSelector(state => state.auth);

    const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

    const {
        formState, email, displayName, password, onInputChange,
        isFormValid, emailValid, displayNameValid, passwordValid,
    } = useForm(formData, formValidations);


    const onSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        dispatch(startCreatingUserWithEmailAndPassword(formState));
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

                        <Grid
                            item
                            display={!!errorMessage ? '' : 'none'}
                            xs={12} >
                            <Alert severity='error'>
                                {errorMessage}
                            </Alert>
                        </Grid>
                        <Grid item xs={12} >
                            <Button
                                disabled={isCheckingAuthentication}
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
