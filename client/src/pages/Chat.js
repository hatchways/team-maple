import React from "react";

import { 
  Grid,
  withStyles,
  Paper,
} from "@material-ui/core";
import ChatInbox from "../components/ChatInbox";
import ChatWindow from "../components/ChatWindow";

const styles = theme => ({
  container : {
    minHeight: "95vh",
  },
})

const Chat = ({ classes }) => {
  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={4}>
          <Paper>
            <ChatInbox />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper>
            <ChatWindow/>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(styles)(Chat);