import React, { useState } from 'react';
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
import { withStyles } from "@material-ui/core/styles";
import { CssBaseline, TextField } from '@material-ui/core';
import { registerUser } from "../actions/authActions";

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
    }
})

const SignUpForm = ({ classes, history, registerUser, auth }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
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
            console.log("Attempt to log in");
            const newUser = {
                name,
                email,
                password,
            };
            registerUser(newUser, history);
        }
    }
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
                </Button>`
            </form>
        </Paper>
    )
}

const mapStateToProps = ({auth, errors}) => ({
    auth,
    errors,
});

const mapDispatchToProps = {
    registerUser,
};

const enhance = compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(SignUpForm);