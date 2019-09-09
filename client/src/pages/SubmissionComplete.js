import React, { Component, Fragment } from "react";
import {
  CssBaseline,
  Container,
  Typography,
  Grid,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
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
  class SubmissionComplete extends Component {
    state = {
      contest: null
    };

    componentDidMount() {
      const { subId } = this.props.match.params;
      console.log("subId", subId);
      axios
        .get("/submitted/" + subId)
        .then(response => {
          const trimmedContest = {
            ...response.data.contest._doc,
            submission: response.data.contest.submission
          };
          this.setState({
            contest: trimmedContest
          });
        })
        .catch(err => console.log(err));
    }

    redirectHandler = () => {
        this.props.history.push('/contests');
    }

    render() {
      const { classes } = this.props;
      const { contest } = this.state;
      console.log(contest);
      let display = null;
      if (contest) {
        display = (
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
                    Congratulations on your submission!
                  </Typography>
                  <Typography
                    variant="h5"
                    align="center"
                    color="textSecondary"
                    paragraph
                  >
                    Your confirmation number is #{contest.submission._id}. The
                    winner of this contest will be decided by JACK on{" "}
                    {new Date(contest.deadline).toString()} so until then check
                    out all the other available contests and submit your
                    designs!
                  </Typography>
                </Container>

                <div className={classes.heroButton}>
                  <Grid container spacing={2} justify="center">
                    <Grid item>
                      <Button variant="contained" color="primary" onClick={this.redirectHandler}>
                        View More Contests
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </main>
          </Fragment>
        );
      }

      return display;
    }
  }
);
