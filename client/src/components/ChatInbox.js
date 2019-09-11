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
} from "@material-ui/core";
import ChatInboxItem from "./ChatInboxItem";

const styles = theme => ({
  header: {
    padding: theme.spacing(4, 2),
  }
})

const ChatInbox = ({ classes, chat }) => {
  console.log(chat);
  return (
    <>
      <Paper>
        <Paper className={classes.header}>
          <Typography variant="h5">
            Inbox Messages
          </Typography>
        </Paper>
        { chat && Object.entries(chat).map(( [id, conversation] ) => {
            const { lastMessage } = conversation;
            const { name, profileUrl } = conversation.user;
            return (
              <ChatInboxItem key={id} id={id} lastMessage={lastMessage} name={name} profileUrl={profileUrl} />
            );
          })
        }
      </Paper>
    </>
  );
}

const mapStateToProps = ({ chat }) => ({
  chat,
});

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps),
);

export default enhance(ChatInbox);