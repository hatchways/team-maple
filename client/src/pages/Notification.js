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

const styles = theme => ({});

class Notification extends Component {
  render() {
    const { classes, notifications } = this.props;
    console.log("from notification page", notifications);
    return (
      <div>
        this is notifications:{" "}
        {notifications &&
          notifications.map((notif, i) => {
            return (
              <div key={i}>
                <div>message: {notif.message}</div>
                <div>id: {notif._id}</div>
                <div>read: {notif.read}</div>
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

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps)
);

export default enhance(Notification);
