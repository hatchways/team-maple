import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    appbar: {
        color: "white",
        backgroundColor: theme.secondary,
    },
    title: {
        textTransform: "uppercase",
        letterSpacing: theme.spacing(1),
        flexGrow: 1,
    },
    button: {
        color: "white",
    }

})

const NavBar = ({ classes }) => {
    return (
        <AppBar position="static" className={classes.appbar}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    tattoo art
                </Typography>
                <Button variant="outlined" color="inherit" className={classes.button}>
                    sign in
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default withStyles(styles)(NavBar);