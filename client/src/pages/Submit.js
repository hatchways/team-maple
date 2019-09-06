import React, { Component, Fragment } from "react";
import { Button, Paper, Typography, IconButton, Grid } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import axios from 'axios';

export default class extends Component {

  

  render() {
    const { file, classes, onSelect, submit } = this.props;
    return (
      <Fragment>
        <Grid item sm>
          <Paper className={classes.paper}>
            <Typography variant="h4" align="center">
              Submit design
            </Typography>

            <IconButton onClick={() => this.fileUpload.click()}>
              <CloudUpload className={classes.largeIcon} />
            </IconButton>
            <div>{file ? file.name : null}</div>
            <Typography variant="h5" align="center">
              Click to choose a file
            </Typography>
            <Typography variant="body2" align="center">
              High resolution images PNG, JPG, GIF
            </Typography>
          </Paper>
        </Grid>
        <Grid item sm>
          <input
            type="file"
            ref={fileUpload => {
              this.fileUpload = fileUpload;
            }}
            style={{ display: "none" }}
            onChange={onSelect}
          />
        </Grid>
        <Grid item sm>
          <Button
            variant="outlined"
            component="label"
            className={classes.button}
            onClick={submit}
          >
            Submit
          </Button>
        </Grid>
      </Fragment>
    );
  }
}
