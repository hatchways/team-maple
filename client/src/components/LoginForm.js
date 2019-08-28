import React from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { withStyles } from "@material-ui/core/styles";
import { CssBaseline, TextField } from '@material-ui/core';

const styles = theme => ({
    root: {
        padding: theme.spacing(5),
    },
    form: {
        textAlign: "center"
    },
    grid: {
        marginBottom: theme.spacing(5),
    },
    submit: {
        color: "white",
        backgroundColor: theme.secondary,
    }
})

const LoginForm = ({ classes }) => {
    return (
        <Paper className={classes.root}>
            <CssBaseline />
            <Typography component="h1" variant="h4" align="center">
                Sign in
            </Typography>
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="E-mail"
                    name="email"
                    placeholder="Enter e-mail address"
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    id="password"
                />
                <Grid container justify="space-between" className={classes.grid}>
                    <Grid item>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    className={classes.submit}
                >
                    Sign In
                </Button>`
            </form>
        </Paper>
    )
}

export default withStyles(styles)(LoginForm);