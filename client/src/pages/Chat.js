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

const styles = theme => ({

})

const Chat = ({ classes, socket }) => {
  const [ content, setContent ] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      content,
      conversationId: "5d7782404087120980ed5c0d",
    };
    socket.emit("message", body, (error) => {
      console.log(error);
    });
    setContent("");
  }
  if(!socket) console.log("socket undefined");
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
            required
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
    </div>
  )
}

const mapStateToProps = ({ socket }) => ({
  socket,
});

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps),
);

export default enhance(Chat);