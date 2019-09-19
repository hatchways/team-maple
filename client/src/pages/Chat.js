import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { 
  Grid,
  withStyles,
  Paper,
} from "@material-ui/core";
import ChatInbox from "../components/ChatInbox";
import ChatWindow from "../components/ChatWindow";
import { onChatPage, offChatPage } from "../actions/currentChatActions";

const styles = theme => ({
  container : {
    height: "95vh",
  },
  paper: {
    height: "100%",
  },
})

const Chat = ({ classes, onChatPage, offChatPage }) => {
  useEffect(() => {
    onChatPage();
    return cleanup => {
      offChatPage();
    }
  }, []);
  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <ChatInbox />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <ChatWindow/>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

const enhance = compose(
  withStyles(styles),
  connect(null, { onChatPage, offChatPage })
);

export default enhance(Chat);