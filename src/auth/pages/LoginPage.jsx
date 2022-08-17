import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout';

import { useForm } from '../../hooks';
import { checkingAuthentication, startGoogleSingIn } from '../../store/auth';
import { useSelector } from 'react-redux';


export const LoginPage = () => {

    const { status } = useSelector(state => state.auth);

    const { email, password, onInputChange, } = useForm({
        email: '',
        password: ''
    });

    const isAuthenticated = useMemo(() => status === 'checking', [status]);

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(checkingAuthentication(email, password));
    }

    const onGoogleLogin = () => {
        dispatch(startGoogleSingIn())
    }

    return (
        <AuthLayout title='Iniciar Sesion'>

            <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
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
                            label="Contraseña"
                            type='password'
                            placeholder='********'
                            fullWidth
                            name='password'
                            value={password}
                            onChange={onInputChange}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <Button
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
