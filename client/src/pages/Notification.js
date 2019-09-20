import React, { Component, Fragment } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  CssBaseline,
  Container,
  Typography,
  Grid,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { setReadNotification } from "../actions/notificationActions";

const styles = theme => ({});

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
        this is notifications:{" "}
        {notifications &&
          notifications.map((notif, i) => {
            return (
              <div key={i} onClick={() => this.handleClicked(notif)}>
                <div>message: {notif.message}</div>
                <div>id: {notif._id}</div>
                <div>read: {notif.read ? "has been read" : "not read"}</div>
                <div>priority: {notif.priority}</div>
                <br></br>
              </div>
            );
          })}
        <div></div>
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
