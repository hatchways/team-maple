import React, { Component, Fragment } from "react";
import {
  CssBaseline,
  Container,
  Typography,
  Grid,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Contests from '../pages/Contests';

const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButton: {
    marginTop: theme.spacing(4)
  }
}));

export default class Discovery extends Component {
  state = {
    contests: []
  };

  componentDidMount() {
      //send get request to back end, get data back, store in state and pass down
      //to Contests component
  }

  render() {
    const classes = useStyles();
    const { contests } = this.state;
    return (
      <Fragment>
        <CssBaseline />

        <main>
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                variant="h1"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Discover Contests
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Check out all the amazing contests below and submit your design
                today!
              </Typography>
            </Container>

            <div className={classes.heroButton}>
              <Button variant="contained" color="primary">
                Go Now!
              </Button>
            </div>
          </div>
            <Contests cards={contests} />
        </main>
      </Fragment>
    );
  }
}
