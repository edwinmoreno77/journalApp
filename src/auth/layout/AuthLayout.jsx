import { Grid, Typography } from "@mui/material"


export const AuthLayout = ({ children, title = '' }) => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{
                // width: { md: 450 },
                minHeight: '100vh',
                backgroundColor: 'primary.main',
                padding: 4
            }}
        >
            <Grid item
                className="box-shadow"
                xs={3}
                sx={{
                    width: { sm: 400 },
                    backgroundColor: 'white',
                    padding: 4, borderRadius: 2
                }}>

                <Typography variant="h5" sx={{ mb: 1 }}>{title}</Typography>
                {children}
            </Grid>
        </Grid>

    )
}
