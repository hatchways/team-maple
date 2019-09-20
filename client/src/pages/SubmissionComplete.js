import React, { Component, Fragment } from "react";
import {
  CssBaseline,
  Container,
  Typography,
  Grid,
  Button,
  Paper,
  ButtonBase
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
  },
  button: {
    margin: theme.spacing(2)
  },
  paper: {
    padding: 20,
    margin: "20px auto",
    maxWidth: "50%"
  },
  img: {
    width: "100%"
  }
});

export default withStyles(styles)(
  class SubmissionComplete extends Component {
    state = {
      submission: null
    };

    componentDidMount() {
      const { subId } = this.props.match.params;
      console.log("subId", subId);
      axios
        .get("/submitted/" + subId)
        .then(response => {
          console.log(response.data);
          this.setState({
            submission: response.data.sub
          });
        })
        .catch(err => console.log(err));
    }

    redirectHandler = () => {
      this.props.history.push("/contests");
    };

    goBackHandler = () => {
      this.props.history.go(-2);
    };

    render() {
      const { classes } = this.props;
      const { submission } = this.state;
      console.log(submission);
      let display = null;
      if (submission) {
        display = (
          <Fragment>
            <CssBaseline />

            <main>
              <div className={classes.heroContent}>
                <Container maxWidth="md">
                  <Typography
                    variant="h3"
                    align="center"
                    color="textPrimary"
                    gutterBottom
                  >
                    Congratulations on your Submission!
                  </Typography>
                  <Paper className={classes.paper}>
                    <Grid
                      container
                      direction="column"
                      spacing={1}
                      justify="flex-start"
                    >
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography
                          variant="h4"
                          align="center"
                          color="textPrimary"
                        >
                          {" "}
                          Details{" "}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography>
                          <strong> Title: </strong>
                          {submission.contest.title}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography>
                          <strong> Description: </strong>
                          {submission.contest.description}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography>
                          <strong> Prize: </strong>${submission.contest.prize}
                        </Typography>
                      </Grid>
                      <Grid item container>
                        <Grid item>
                          <Typography><strong>Tatoo Design:</strong></Typography>
                        </Grid>
                        <Grid item>
                          <ButtonBase className={classes.image}>
                            <img
                              className={classes.img}
                              alt="complex"
                              src={`${process.env.REACT_APP_S3_URL}/${submission.url}`}
                            />
                          </ButtonBase>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>

                  <Typography
                    variant="h5"
                    align="center"
                    color="textSecondary"
                    paragraph
                  >
                    Your confirmation number is #{submission._id}. The winner of
                    this contest will be decided by {submission.creator.name} on{" "}
                    {new Date(submission.contest.deadline).toDateString()} so
                    until then check out all the other available contests and
                    submit your designs!
                  </Typography>
                </Container>

                <div className={classes.heroButton}>
                  <Grid container spacing={2} justify="center">
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.redirectHandler}
                      >
                        View More Contests
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        onClick={this.goBackHandler}
                      >
                        Contest Detail Page
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
