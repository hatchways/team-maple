import React, { useState, useEffect } from "react";
import * as io from "socket.io-client";
import tokenStorage from "../utils/tokenStorage";

import { 
  Grid,
  Typography,
  withStyles,
  TextField,
  Button,
} from "@material-ui/core";

const styles = theme => ({

})

const Chat = ({ classes }) => {
  const [ socket, setSocket ] = useState(null);
  const [ content, setContent ] = useState("");
  useEffect(() => {
    const token = tokenStorage.getAuthToken() || "";
    const newSocket = io({
      transportOptions: {
        polling: {
          extraHeaders: {
            'authorization': token,
          }
        }
      }
    });
    newSocket.on("error", error => {
      console.log(error);
    })
    newSocket.on("message", body => {
      console.log(body);
    })
    newSocket.on("updateChat", body => {
      console.log(body);
    })
    setSocket(newSocket);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      content,
      conversationId: "",
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

export default withStyles(styles)(Chat);