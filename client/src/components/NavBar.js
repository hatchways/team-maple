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
    Badge,
    withStyles,
} from "@material-ui/core";
import {
    green,
} from "@material-ui/core/colors";
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
    badge: {
        backgroundColor: green[400],
        padding: theme.spacing(0.5),
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

const NavBar = ({ classes, auth, logoutUser, history, profile, notificationNum, chatNotificationNum }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (e) => setAnchorEl(e.currentTarget);
    const handleClose = (e) => setAnchorEl(null);
    const redirectProfile = (e) => {
        history.push(`/profile/${auth.user.userId}`);
        handleClose(e);
    }
    const redirectPayments = (e) => {
        history.push(`/payment`);
        handleClose(e);
    }
    const redirectAccounts = (e) => {
        history.push(`/account`);
        handleClose(e);
    }
    const handleLogout = (e) => {
        handleClose(e);
        logoutUser(history);
    }
    const { profileUrl } = profile;
    const url = profileUrl ? `${process.env.REACT_APP_S3_URL}/${profileUrl}` : "";
    return (
        <AppBar position="static" className={classes.appbar}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    tattoo art
                </Typography>
                {!auth.isAuthenticated ?
                    <Button variant="outlined" color="inherit" className={classes.button} component={signInLink}>
                        sign in
                    </Button>
                    :
                    <>
                        <Link component="button" variant="body2" to="/contests" className={classes.link}>Discover</Link>
                        {chatNotificationNum ? (
                            <Badge overlap="circle" badgeContent={chatNotificationNum} classes={{ badge: classes.badge }}>
                                <Link component="button" variant="body2" to="/chat" className={classes.link}>Messages</Link>
                            </Badge>
                        ) : (
                                <Link component="button" variant="body2" to="/chat" className={classes.link}>Messages</Link>
                            )
                        }
                        {notificationNum  ? (
                            <Badge
                                overlap="circle"
                                badgeContent={notificationNum}
                                classes={{ badge: classes.badge }}
                            >
                                <Link
                                component="button"
                                variant="body2"
                                to="/notifications"
                                className={classes.link}
                                >
                                Notifications
                                </Link>
                            </Badge>
                            ) : (
                            <Link
                                component="button"
                                variant="body2"
                                to="/notifications"
                                className={classes.link}
                            >
                                Notifications
                            </Link>
                        )}
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
                            <MenuItem onClick={() => redirectProfile()}>My Profile</MenuItem>
                            <MenuItem onClick={() => redirectPayments()}>Payments</MenuItem>
                            <MenuItem onClick={() => redirectAccounts()}>Account</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </>
                }
            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = ({ auth, profile, chat, notifications }) => ({
    auth,
    profile,
    chatNotificationNum: chat && Object.values(chat).filter(c => !c.read).length || 0,
    notificationNum: notifications && notifications.filter(n => !n.read).length || 0,
});

const enhance = compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps, { logoutUser }),
);

export default enhance(NavBar);