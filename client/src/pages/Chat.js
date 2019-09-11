import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import { 
  Grid,
  Typography,
  withStyles,
  TextField,
  Button,
} from "@material-ui/core";
import { sendMessage, startConversation } from "../actions/socketActions";

const styles = theme => ({

})

const Chat = ({ classes, sendMessage, startConversation }) => {
  const [ content, setContent ] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      content,
      conversationId: "5d7782404087120980ed5c0d",
    };
    // socket.emit("message", body, (error) => {
    //   console.log(error);
    // });
    sendMessage(body);
    setContent("");
  }
  const handleConversation = (e) => {
    e.preventDefault();
    const body = {
      // chat 1
      other: "5d7729d1b43f3f36d40eb305",
    }
    startConversation(body);
  }
  return (
    <div>
      <Grid container spacing={0} alignItems="center" justify="center" className={classes.grid}>
        <Typography>
          Hello Chat
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="Write a message"
            value={content}
            onChange={e => setContent(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              className={classes.submit}
            >
              Send message
          </Button>
        </form>
      </Grid>
      <Grid container spacing={0} alignItems="center" justify="center">
        <Button
          onClick={handleConversation}
          variant="contained"
          size="large"
        >
          Start Conversation
        </Button>
      </Grid>
    </div>
  )
}

const mapDispatchToProps = {
  sendMessage,
  startConversation,
}

const enhance = compose(
  withStyles(styles),
  connect(null, mapDispatchToProps),
);

export default enhance(Chat);