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
import ChatMessage from "./ChatMessage";
import { sendMessage } from "../actions/socketActions";

const NoChatSelected = () => (
  <Grid container spacing={0} alignItems="center" justify="center" styles={{ flexGrow: 1 }}>
    <Typography variant="h5">
      Select a chat
    </Typography>
  </Grid>
 );

const styles = theme => ({
  container: {
    height: "100%",
  },
  avatar: {
    marginLeft: theme.spacing(2),
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  headerContainer: {
    height: "12%"
  },
  header: {
    padding: theme.spacing(2),
    backgroundColor: grey[200],
    height: "100%",
  },
  name: {
    marginLeft: theme.spacing(4)
  },
  bodyContainer: {
    height: "76%",
  },
  body: {
    padding: theme.spacing(4),
    overflow: "auto",
    height: "100%",
  },
  footerContainer: {
    height: "12%",
  },
  footer: {
    height: "100%",
  },
  form: {
    width: "100%",
    height: "100%",
  },
  inputContainer: {
    display: "flex",
    height: "100%",
  },
  input: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
  },
  button: {
    backgroundColor: "black",
    color: "white",
    padding: theme.spacing(1, 3),
    marginLeft: theme.spacing(2),
  }
})

const ChatWindow = ({ classes, chat, sendMessage, currentChat }) => {
  const [content, setContent ] = useState("");
  if (!chat) {
    return (
      <NoChatSelected />
    )
  }
  const { profileUrl, name, id: otherId } = chat.user;
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
    <Grid container alignItems="stretch" className={classes.container}>
      <Grid item xs={12} className={classes.headerContainer}>
        <Paper className={classes.header}>
          <Grid container alignItems="center">
            <Avatar alt={name} src={url} className={classes.avatar}/>
            <Typography variant="h5" className={classes.name}>
              {name}
            </Typography>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} className={classes.bodyContainer}>
        <Paper className={classes.body}>
            {messages.map(message => {
              return message.sender === otherId ? (
                <ChatMessage other={true} key={message._id} profileUrl={profileUrl} content={message.content} name={name} />
              ) : (
                  <ChatMessage key={message._id} content={message.content} />
                )
              }
            )}
        </Paper>
      </Grid>
      <Grid item xs={12} className={classes.footerContainer}>
        <Paper className={classes.footer}>
          <form onSubmit={handleSubmit} className={classes.form}>
            <Grid item xs={12} alignItems="center" justify="center" className={classes.inputContainer}>
              <TextField
                className={classes.input}
                margin="normal"
                variant="outlined"
                placeholder={`Reply to ${name}`}
                required
                value={content}
                onChange={e => setContent(e.target.value)}
              />
              <Button type="submit" variant="outlined" className={classes.button} onClick={handleSubmit}>
                Send
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
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