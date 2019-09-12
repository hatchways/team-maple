import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import { 
  Grid,
  Typography,
  withStyles,
  TextField,
  Box,
  Paper,
} from "@material-ui/core";
import ChatInbox from "../components/ChatInbox";
import ChatWindow from "../components/ChatWindow";

const styles = theme => ({
  container : {
    minHeight: "100vh",
  },
  inbox: {
    flexGrow: 1,
  },
  body: {
    flexGrow: 5,
  }
})

const Chat = ({ classes }) => {
  return (
    <>
      <Grid container className={classes.container}>
        <Paper className={classes.inbox} height="100%">
          <ChatInbox />
        </Paper>
        <Paper className={classes.body} height="100%">
          <ChatWindow/>
        </Paper>
      </Grid>
    </>
  )
}

export default withStyles(styles)(Chat);