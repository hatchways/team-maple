import React from "react";

import { 
  Grid,
  Typography,
  withStyles,
  Avatar,
  Paper,
} from "@material-ui/core";

const styles = theme => ({
  otherMessage: {
    margin: theme.spacing(2)
  },
  otherChatBox: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(5),
  },
  ownMessage: {
    margin: theme.spacing(2)
  },
  ownChatBox: {
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(5),
  }
})

const ChatMessage = ({ classes, content, other, profileUrl, name }) => {
  return (
    <>
      { 
        other ? (
          <>
            <Grid container justify="flex-start" alignItems="center" className={classes.otherMessage}>
              { profileUrl ? 
                <Avatar alt={name} src={`${process.env.REACT_APP_S3_URL}/${profileUrl}`} />
                :
                <Avatar src=""/>
              }
              <Paper className={classes.otherChatBox}>
                <Typography variant="body1">
                  {content}
                </Typography>
              </Paper>
            </Grid>
          </>
        ) : (
          <Grid container justify="flex-end" className={classes.ownMessage}>
            <Paper className={classes.ownChatBox}>
              <Typography variant="body1">
                {content}
              </Typography>
            </Paper>
          </Grid>
        )
      }
    </>
  );
}

export default withStyles(styles)(ChatMessage);