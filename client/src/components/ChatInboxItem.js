import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import { 
  Grid,
  Typography,
  withStyles,
  Button,
  Paper,
  Box,
  Avatar,
} from "@material-ui/core";
import {
  grey,
} from "@material-ui/core/colors";
import { setCurrentChat } from "../actions/currentChatActions";

const styles = theme => ({
  container: {
    padding: theme.spacing(3, 2),
  },
  info: {
    marginLeft: theme.spacing(2),
    flexGrow: 1,
  },
  name: {
    fontWeight: "bold",
  },
  subtitle: {
    color: grey[400],
  }
})

const ChatInboxItem = ({ classes, lastMessage, name, profileUrl, id, setCurrentChat }) => {
  const url = profileUrl ? `${process.env.REACT_APP_S3_URL}/${profileUrl}` : "";
  
  let timeString;
  if (!lastMessage.createdAt) {
    timeString = "";
  } else {
    const timestamp = new Date(lastMessage.createdAt);
    const now = Date.now().valueOf();
    const difference = now - timestamp.valueOf();
    const day = 60 * 60 * 24 * 1000;
    let options;

    if (difference > 7 * day) {
      // DD/MM/YYYY
      options = { day: "numeric", month: "numeric", year: "numeric"}
      timeString = timestamp.toLocaleDateString("en-US", options);
    } else if (difference > 2 * day) {
      // Saturday
      options = { weekday: "long" }
      timeString = timestamp.toLocaleDateString("en-US", options);
    } else if (difference > day) {
      timeString = "Yesterday";
    } else {
      // 8:00 AM
      options = { hour: "2-digit", minute: "2-digit" }
      timeString = timestamp.toLocaleTimeString("en-US", options);
    }
  }
  const handleClick = (e) => {
    setCurrentChat(id);
  }
  return (
    <>
      <Paper borderBottom={1} className={classes.container} height="100%" onClick={handleClick}>
        <Grid container>
          <Avatar alt={name} src={url} />
          <Grid item className={classes.info}>
            <Typography variant="body1" className={classes.name}>
              {name}
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
              {lastMessage.content}
            </Typography>
          </Grid>
          <Typography variant="subtitle1" className={classes.subtitle}>
            {timeString}
          </Typography>
        </Grid>
      </Paper>
    </>
  )
};

const enhance = compose(
  withStyles(styles),
  connect(null, { setCurrentChat }),
);

export default enhance(ChatInboxItem);