import React, { Component, Fragment } from "react";
import { Button, Paper, Typography, IconButton, Grid } from "@material-ui/core";
import { CloudUpload, PhotoCamera, FilterNone } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import Submit from "../pages/Submit";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import tokenStorage from "../utils/tokenStorage";

const styles = theme => ({
  root: {
    width: 300
  },
  paper: {
    padding: theme.spacing(6),
    margin: "10% auto",
    width: "60%"
  },
  grid: {
    marginTop: theme.spacing(0)
  },
  button: {
    backgroundColor: "black",
    color: "white",
    padding: "10px 20px",
    margin: "20px"
  },
  largeIcon: {
    width: 200,
    height: 200
  }
});

export default withStyles(styles)(
  class extends Component {
    state = {
      file: null
    };

    onSelectHandler = event => {
      console.log(event.target.files);
      this.setState({
        file: event.target.files[0]
      });
    };

    submissionHandler = async () => {
      const { file } = this.state;
      const { match } = this.props;
      if (file) {
        const uploadConfig = await axios.post("/upload/submission", {
          contestId: match.params.id
        });

        await axios.put(uploadConfig.data.url, file, {
          headers: {
            "Content-type": file.type,
            "Cache-Control": "public, max-age=31536000"
          }
        });

        setAuthToken(tokenStorage.getAuthToken());
        
        await axios.post("/submit", {
          imageUrl: uploadConfig.data.key,
          contestId: match.params.id,
        });
      }

      // this.redirectHandler();
    };

    redirectHandler = () => {
      this.props.history.push('/contests');
    }

    render() {
      const { classes } = this.props;
      const { file } = this.state;
      return (
        <div style={{ margin: "auto", textAlign: "center" }}>
          <Grid
            container
            direction="column"
            spacing={4}
            justify="center"
            className={classes.grid}
          >
            <Submit
              file={file}
              classes={classes}
              onSelect={this.onSelectHandler}
              submit={this.submissionHandler}
            />
          </Grid>
        </div>
      );
    }
  }
);
