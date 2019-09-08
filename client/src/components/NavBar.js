import React, { useState } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Avatar,
    Menu,
    MenuItem,
    withStyles,
} from "@material-ui/core";
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
const createContestLink = React.forwardRef((props, ref) => <Link innerRef={ref} to="/create" {...props} />);

const NavBar = ({ classes, auth, logoutUser, history, profile }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (e) => setAnchorEl(e.currentTarget);
    const handleClose = (e) => setAnchorEl(null);
    const redirect = (e) => {
        history.push(`/profile/${auth.user.userId}`);
        handleClose(e);
    }
    const handleLogout = (e) => {
        handleClose(e);
        logoutUser();
    }
    const { profileUrl } = profile;
    const url = profileUrl ? `${process.env.REACT_APP_S3_URL}/${profileUrl}` : "";
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
                        <Button variant="outlined" color="inherit" className={classes.button} component={createContestLink}>
                            Create Contest
                        </Button>
                        <Avatar alt={auth.user.email} src={url} />
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
                            <MenuItem onClick={() => redirect()}>My Profile</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </>
                }
            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = ({ auth, profile }) => ({
    auth,
    profile,
});

const enhance = compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps, { logoutUser }),
);

export default enhance(NavBar);