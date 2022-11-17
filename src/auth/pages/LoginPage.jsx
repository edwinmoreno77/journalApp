import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout';

import { useForm } from '../../hooks';
import { startGoogleSingIn, startLoginWithEmailAndPassword } from '../../store/auth';
import { useSelector } from 'react-redux';



const formData = {
    email: '',
    password: ''
}



export const LoginPage = () => {

    const { status, errorMessage } = useSelector(state => state.auth);

    const { email, password, onInputChange, } = useForm(formData);

    const isAuthenticated = useMemo(() => status === 'checking', [status]);

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(startLoginWithEmailAndPassword({ email, password }))
    }

    const onGoogleLogin = () => {
        dispatch(startGoogleSingIn())
    }

    return (
        <AuthLayout title='Iniciar Sesion'>

            <form
                className='animate__animated animate__fadeIn animate__faster'
                onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            inputProps={{'data-testid': 'email-input'}}
                            label="Correo"
                            type='email'
                            placeholder='correo@gmail.com'
                            fullWidth
                            name='email'
                            value={email}
                            onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            inputProps={{ 'data-testid': 'input-password' }}
                            label="Contraseña"
                            type='password'
                            placeholder='********'
                            fullWidth
                            name='password'
                            value={password}
                            onChange={onInputChange}
                        />
                    </Grid>

                    <Grid
                        container
                        sx={{ mt: 1, mb: 1 }}
                        display={!!errorMessage ? '' : 'none'}>
                        <Grid
                            item
                            xs={12}
                        >
                            <Alert severity='error'>
                                {errorMessage}
                            </Alert>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <Button
                                data-testid='loginBtn'
                                disabled={isAuthenticated}
                                type='submit'
                                variant="contained"
                                fullWidth
                            >
                                acceder
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                data-testid='google-button'
                                disabled={isAuthenticated}
                                onClick={onGoogleLogin}
                                variant="contained"
                                fullWidth>
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>

                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Link component={RouterLink} color='inherit' to="/auth/register">
                            Crear una cuenta
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>

    )
}
