import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Grid } from "@material-ui/core";
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

export default withRouter(
  withStyles(styles)(
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
        const { match, history } = this.props;
        if (file) {
          const uploadConfig = await axios.post("/upload/submission", {
            contestId: match.params.id
          });

          setAuthToken();
          await axios.put(uploadConfig.data.url, file, {
            headers: {
              "Content-type": file.type,
              "Cache-Control": "public, max-age=31536000"
            }
          });
          setAuthToken(tokenStorage.getAuthToken());

          axios
            .post("/submit", {
              imageUrl: uploadConfig.data.key,
              contestId: match.params.id
            })
            .then(result => {
              history.push(`/submitted/${result.data.result._id}`);
            });
        }
      };

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
  )
);
