import React, { useState, useEffect } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import { green, amber } from '@material-ui/core/colors'
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from "@material-ui/core/styles";
import { CssBaseline, TextField } from '@material-ui/core';
import { registerUser, setUserLoading, clearSignupErrors } from "../actions/authActions";

const styles = theme => ({
    root: {
        padding: theme.spacing(5),
    },
    form: {
        textAlign: "center"
    },
    textField: {
        marginBottom: theme.spacing(5),
    },
    controlLabel: {
        backgroundColor: "white",
    },
    formControl: {
        width: "100%",
        margin: theme.spacing(2, 2, 2, 0),
    },
    submit: {
        color: "white",
        backgroundColor: theme.secondary,
    },
    successSnackBar: {
        backgroundColor: green[600],
    },
    errorSnackBar: {
        backgroundColor: amber[700],
    }
})

const SignUpForm = ({ classes, history, registerUser, setUserLoading, errors, auth, clearSignupErrors }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const validatePassword = (password) => {
        setPassword(password);
        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long")
        } else {
            setPasswordError("")
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!passwordError) {
            setUserLoading();
            const newUser = {
                name,
                email,
                password,
            };
            registerUser(newUser);
        }
    }
    const handleSuccessClose = () => {
        setOpenSuccess(false);
        history.push("/login");
    }
    
    const handleErrorsClose = () => {
        setOpenError(false);
        clearSignupErrors();
    }

    useEffect(() => {
        clearSignupErrors();
        setOpenError(false);
    }, []);

    useEffect(() => {
        if (auth.isAuthenticated) {
            history.push("/home");
        }
    }, [auth]);

    useEffect(() => {
        if (errors.status) {
            if (errors.status === "error") {
                setOpenError(true);
            } else if (errors.status === "success") {
                setOpenSuccess(true);
            }
        } else {
            setOpenError(false);
            setOpenSuccess(false);
        }
    }, [errors]);

    return (
        <Paper className={classes.root}>
            <CssBaseline />
            <Typography component="h1" variant="h4" align="center">
                Sign up
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    placeholder="Enter e-mail address"
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    name="Enter your name"
                    placeholder="Enter your name"
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
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    className={classes.submit}
                >
                    Sign In
                </Button>
            </form>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={openSuccess}
                autoHideDuration={4000}
                onClose={handleSuccessClose} 
            >
                <SnackbarContent
                    className={classes.successSnackBar}
                    aria-describedby="client-snackbar"
                    message={<span id="message-id">{errors.message}</span>}
                    action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        onClick={handleSuccessClose}
                    >
                        <CloseIcon />
                    </IconButton>
                    ]}
                />
            </Snackbar>
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

const mapStateToProps = ({ auth, errors }) => ({
    auth,
    errors: errors.signup,
});

const mapDispatchToProps = {
    registerUser,
    setUserLoading,
    clearSignupErrors,
};

const enhance = compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(SignUpForm);