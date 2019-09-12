import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { 
  Typography,
  withStyles,
  Paper,
} from "@material-ui/core";
import ChatInboxItem from "./ChatInboxItem";

const styles = theme => ({
  header: {
    padding: theme.spacing(4, 2),
  }
})

const ChatInbox = ({ classes, chat }) => {
  return (
    <>
      <Paper>
        <Paper className={classes.header}>
          <Typography variant="h5">
            Inbox Messages
          </Typography>
        </Paper>
        { chat && Object.entries(chat)
            .sort((a, b) => { 
              if (!a[1].lastMessage.createdAt && !b[1].lastMessage.createdAt) {
                return a[1].user.name.localeCompare(b[1].user.name);
              }
              if (!a[1].lastMessage.createdAt) return 1;
              if (!b[1].lastMessage.createdAt) return -1;
              return new Date(b[1].lastMessage.createdAt) - new Date(a[1].lastMessage.createdAt);
            })
            .map(( [id, conversation] ) => {
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