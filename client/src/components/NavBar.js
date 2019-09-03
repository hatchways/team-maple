import React, { useState } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from "@material-ui/core/styles";
import { logoutUser } from "../actions/authActions"; 

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
        margin: theme.spacing(2),
    },
    link: {
        color: "white",
        textDecoration: "none",
        margin: theme.spacing(2),
    }
})

const signInLink = React.forwardRef((props, ref) => <Link innerRef={ref} to="/login" {...props} />);

const NavBar = ({ classes, auth, logoutUser }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (e) => setAnchorEl(e.currentTarget);
    const handleClose = (e) => setAnchorEl(null);
    return (
        <AppBar position="static" className={classes.appbar}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    tattoo art
                </Typography>
                { !auth.isAuthenticated ? 
                    <Button variant="outlined" color="inherit" className={classes.button} component={signInLink}>
                        sign in
                    </Button>
                    :
                    <>
                        <Link component="button" variant="body2" to="#" className={classes.link}>Discover</Link>
                        <Link component="button" variant="body2" to="#" className={classes.link}>Messages</Link>
                        <Link component="button" variant="body2" to="#" className={classes.link}>Notifications</Link>
                        <Button variant="outlined" color="inherit" className={classes.button}>
                            Create Contest
                        </Button>
                        <Avatar alt={auth.user.email} src="" />
                        <Button aria-controls="account-menu" aria-haspopup="true" className={classes.button} onClick={handleClick}>
                            Account &#9660;
                        </Button>
                        <Menu
                            id="account-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            className="menu"
                        >
                            <MenuItem onClick={handleClose}>My Profile</MenuItem>
                            <MenuItem onClick={() => logoutUser()}>Logout</MenuItem>
                        </Menu>
                    </>
                }
            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = ({ auth }) => ({
    auth,
});

const enhance = compose(
    withStyles(styles),
    connect(mapStateToProps, { logoutUser }),
);

export default enhance(NavBar);