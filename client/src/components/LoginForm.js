import React, { useState, useEffect } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { Link as RouterLink, withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { amber } from '@material-ui/core/colors'
import { withStyles } from "@material-ui/core/styles";
import { CssBaseline, TextField } from '@material-ui/core';
import { loginUser, clearLoginErrors } from "../actions/authActions";

const styles = theme => ({
    root: {
        padding: theme.spacing(5),
    },
    form: {
        textAlign: "center"
    },
    controlLabel: {
        backgroundColor: "white",
    },
    formControl: {
        width: "100%",
        margin: theme.spacing(2, 2, 2, 0),
    },
    grid: {
        marginBottom: theme.spacing(5),
    },
    submit: {
        color: "white",
        backgroundColor: theme.secondary,
    },
    errorSnackBar: {
        backgroundColor: amber[700],
    },
})

const signUpLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} to="/signup" {...props} />);

const LoginForm = ({ classes, loginUser, auth, history, errors, clearLoginErrors }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [openError, setOpenError] = useState(false);
    useEffect(() => {
        if (auth.isAuthenticated) {
            history.push("/home");
        }
    }, [auth]);
    const validatePassword = (password) => {
        setPassword(password);
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long")
        } else {
            setPasswordError("")
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!passwordError) {
            const userData = { email, password };
            loginUser(userData);
        }
    }

    const handleErrorsClose = () => {
        setOpenError(false);
        clearLoginErrors();
    }
    
    useEffect(() => {
        clearLoginErrors();
        setOpenError(false);
    }, []);

    useEffect(() => {
        if (errors.status) {
            setOpenError(true);
        } else {
            setOpenError(false);
        }
    }, [errors]);
    return (
        <Paper className={classes.root}>
            <CssBaseline />
            <Typography component="h1" variant="h4" align="center">
                Sign in
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    type="email"
                    required
                    fullWidth
                    id="email"
                    label="E-mail"
                    name="email"
                    placeholder="Enter e-mail address"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormControl 
                    variant="outlined" 
                    error={passwordError.length > 0 ? true : false}
                    className={classes.formControl}
                >
                    <InputLabel style={{backgroundColor :"white"}} htmlFor="component-outlined" className={classes.controlLabel}>
                        Password *
                    </InputLabel>
                    <OutlinedInput
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                        id="password"
                        value={password}
                        onChange={e => validatePassword(e.target.value)}
                        aria-describedby="component-helper-text"
                    />
                    <FormHelperText id="component-helper-text">{passwordError}</FormHelperText>
                </FormControl>
                <Grid container justify="space-between" className={classes.grid}>
                    <Grid item>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link component={signUpLink} variant="body2" to="/signup">
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
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={openError}
                autoHideDuration={6000}
                onClose={handleErrorsClose} 
            >
                <SnackbarContent
                    className={classes.errorSnackBar}
                    aria-describedby="client-snackbar"
                    message={<span id="message-id">{errors.message}</span>}
                    action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        onClick={handleErrorsClose}
                    >
                        <CloseIcon />
                    </IconButton>
                    ]}
                />
            </Snackbar>
        </Paper>
    )
}

const mapStateToProps = ({auth, errors}) => ({
    auth,
    errors: errors.login,
});

const mapDispatchToProps = {
    loginUser,
    clearLoginErrors,
};

const enhance = compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(LoginForm);