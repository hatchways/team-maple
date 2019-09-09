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
      axios
        .get("/submitted")
        .then(response => {
        //   this.setState({
        //     contests: response.data.contests
        //   });
        })
        .catch(err => console.log(err));
    }

    render() {
      const { classes } = this.props;
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
                  Congratulations on your submission!
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  paragraph
                >
                  Your confirmation number is ##insert submissionId#. The winner
                  of this contest will be decided by ##contest creator## on
                  ###x_date### so until then check out all the other available
                  contests and submit your designs!
                </Typography>
              </Container>

              <div className={classes.heroButton}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                    >
                      Go Now!
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </main>
        </Fragment>
      );
    }
  }
);
