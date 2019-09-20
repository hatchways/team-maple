import React, { Component, Fragment } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  CssBaseline,
  Container,
  Typography,
  Grid,
  Button,
  Paper,
  Badge
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import { setReadNotification } from "../actions/notificationActions";

const styles = theme => ({
  title: {
    margin: theme.spacing(2)
  },
  outerPaper: {
    margin: '2px auto',
    height: '100vh'
  },
  paper: {
    maxWidth: "60%",
    margin: "16px auto",
    padding: theme.spacing(2, 2)
  },
  badge: {
    backgroundColor: orange[400],
    padding: theme.spacing(1)
  },
  gridItem: {
    borderBottom: "2px solid black",
    margin: theme.spacing(2),
    "&:hover": {
      cursor: "pointer"
    }
  }
});

class Notification extends Component {
  handleClicked = notif => {
    console.log("read message", notif);
    if (!notif.read) {
      this.props.setReadNotification(notif._id);
    }
  };

  render() {
    const { classes, notifications } = this.props;
    console.log("from notification page", notifications);
    return (
      <div>
          <Typography
            variant="h3"
            component="h5"
            align="center"
            className={classes.title}
          >
            Notifications
          </Typography>
          <Grid container>
            <Paper className={classes.paper}>
              {notifications &&
                notifications.map((notif, i) => {
                  return (
                    <Grid
                      item
                      key={i}
                      onClick={() => this.handleClicked(notif)}
                      className={classes.gridItem}
                    >
                      {notif.read ? null : (
                        <div
                          style={{ marginLeft: "auto", width: "min-content" }}
                        >
                          <Badge
                            overlap="circle"
                            badgeContent=" "
                            variant="dot"
                            classes={{ badge: classes.badge }}
                          >
                              <div />
                          </Badge>
                        </div>
                      )}
                      <div>id: {notif._id}</div>
                      <div>message: {notif.message}</div>
                      <div>
                        read: {notif.read ? "has been read" : "not read"}
                      </div>
                      <div>priority: {notif.priority}</div>
                      <br></br>
                    </Grid>
                  );
                })}
              <div></div>
            </Paper>
          </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ notifications }) => ({
  notifications
});

const mapDispatchToProps = {
  setReadNotification
};

// const mapDispatchToProps = dispatch => {
//   return {
//     setReadNotification: (id) => dispatch(setReadNotification(id))
//   };
// };

const enhance = compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(Notification);
