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
    padding: theme.spacing(8, 0, 6),
    backgroundImage: 'url(https://www.gtreview.com/wp-content/uploads/2014/11/Sky-Clouds.jpg)',
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  heroButton: {
    marginTop: theme.spacing(4)
  }
});

export default withStyles(styles)(
  class Discovery extends Component {
    state = {
      contests: null
    };

    componentDidMount() {
      axios
        .get("api/contests")
        .then(response => {
          this.setState({
            contests: response.data.contests
          });
        })
        .catch(err => console.log(err));
    }

    selectContest = id => {
      this.props.history.push(`/contest/${id.toString()}`);
    };

    render() {
      const { classes } = this.props;
      const { contests } = this.state;

      let contestsFragment = null;

      if (this.state.contests) {
        contestsFragment = (
          <Fragment>
            <Contests cards={contests} selectContest={this.selectContest} />
          </Fragment>
        );
      }
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
            </div>
            {contestsFragment}
          </main>
        </Fragment>
      );
    }
  }
);
