import React, { Component, Fragment } from "react";
import { Button, Paper, Typography, Grid } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

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
      backgroundColor: 'black',
      color: 'white',
      padding: '10px 20px',
      margin: '20px'
  }
});

export default withStyles(styles)(
  class extends Component {
    render() {
      const { classes } = this.props;
      return (
        <div style={{ margin: "auto", textAlign: "center" }}>
          <Paper className={classes.paper}>
            <Grid
              container
              direction="column"
              spacing={4}
              justify="center"
              className={classes.grid}
            >
              <Grid item sm>
                <Typography variant="h4" align="center">
                  Submit design
                </Typography>
              </Grid>
              <Grid item sm>
                <Button
                  variant="fab"
                  sizeLarge
                  onClick={this.handleToggle}
                  fullWidth={true}
                >
                  <CloudUpload />
                </Button>
              </Grid>
              <Grid item sm>
                <Typography variant="h5" align="center">
                  Click to choose a file
                </Typography>
              </Grid>
              <Grid item sm>
                <Typography variant="body2" align="center">
                  High resolution images PNG, JPG, GIF
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          <Button variant="outlined" component="label" className={classes.button}>
            Submit
          </Button>
        </div>
      );
    }
  }
);
