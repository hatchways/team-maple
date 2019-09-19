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
    console.log(notifications);
    return (
      <div>
        this is notifications:{" "}
        {notifications &&
          notifications.map(notif => {
            return <div>{notif.message}</div>;
          })}
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
