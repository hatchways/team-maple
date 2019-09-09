import React, { Component, Fragment } from "react";
import {
  CssBaseline,
  Container,
  Typography,
  Grid,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import Contests from "../components/Contests";
import axios from "axios";

const styles = theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButton: {
    marginTop: theme.spacing(4)
  }
});

export default withStyles(styles)(
  class Discovery extends Component {
    state = {
      contests: []
    };

    componentDidMount() {
      //send get request to back end, get data back, store in state and pass down
      //to Contests component
      axios
        .get("/contests")
        .then(response => {
          console.log(response);
          this.setState({
            contests: response.data.contests
          });
        })
        .catch(err => console.log(err));
    }

    selectContest = id => {
      this.props.history.push(`/contest/${id}`);
    };

    render() {
        console.log(this.props.history);
      const { classes } = this.props;
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
                  Check out all the amazing contests below and submit your
                  design today!
                </Typography>
              </Container>

              <div className={classes.heroButton}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Go Now!
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
            <Contests cards={contests} selectContest={this.selectContest} />
          </main>
        </Fragment>
      );
    }
  }
);
