import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import { 
  Grid,
  Typography,
  withStyles,
  TextField,
  Button,
  Paper,
  Avatar,
} from "@material-ui/core";
import {
  grey,
} from "@material-ui/core/colors";
import { sendMessage } from "../actions/socketActions";

const NoChatSelected = () => (
  <Grid container spacing={0} alignItems="center" justify="center" styles={{ flexGrow: 1 }}>
    <Typography variant="h5">
      Select a chat
    </Typography>
  </Grid>
 );

const styles = theme => ({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  header: {
    flexGrow: 1,
    padding: theme.spacing(2),
    backgroundColor: grey[200],
  },
  name: {
    marginLeft: theme.spacing(4)
  },
  body: {
    flexGrow: 1,
  },
  inputRow: {
    flexGrow: 1,
  },
  input: {
    flexGrow: 1,
  },
  button: {
    backgroundColor: "black",
    color: "white",
    padding: theme.spacing(2, 4),
  }
})

const ChatWindow = ({ classes, chat, sendMessage, currentChat }) => {
  const [content, setContent ] = useState("");
  if (!chat) {
    return (
      <NoChatSelected />
    )
  }
  const { profileUrl, name } = chat.user;
  const { messages } = chat;

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      content,
      conversationId: currentChat,
    }
    sendMessage(body);
    setContent("");
  }

  const url = profileUrl ? `${process.env.REACT_APP_S3_URL}/${profileUrl}` : "";
  return (
    <>
      <Grid container>
        <Paper className={classes.header}>
          <Grid container alignItems="center">
            <Avatar alt={name} src={url} className={classes.avatar}/>
            <Typography variant="h5" className={classes.name}>
              {name}
            </Typography>
          </Grid>
        </Paper>
        <Grid container>
          <Paper className={classes.body}>
            {messages.map(message => (
              <Typography key={message.id}>
                {`${message.sender}: ${message.content}`}
              </Typography>
            ))}
          </Paper>
        </Grid>
        <Grid container>
          <form onSubmit={handleSubmit}>
            <Paper className={classes.inputRow}>
              <Grid container spacing={0} alignItems="center" justify="center">
                <TextField
                  className={classes.input}
                  margin="normal"
                  variant="outlined"
                  placeholder="Reply to"
                  required
                  value={content}
                  onChange={e => setContent(e.target.value)}
                />
                <Button type="submit" variant="outlined" className={classes.button} onClick={handleSubmit}>
                    Send
                </Button>
              </Grid>
            </Paper>
          </form>
        </Grid>
      </Grid>
      
    </>
  )
}

const mapStateToProps = ({ chat, currentChat }) => ({
  chat: chat[currentChat],
  currentChat,
});

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, { sendMessage }),
);

export default enhance(ChatWindow);