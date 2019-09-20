import React from "react";
import { withStyles, Grid } from "@material-ui/core";
import ContestDetail from "../components/ContestDetail";

const styles = theme => ({});

const CreateContest = ({ classes, match }) => {
  return (
    <>
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item xs={12} sm={10}>
          <ContestDetail />
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(CreateContest);
