import React from "react";
import {
  withStyles,
  Grid,
  Typography,
} from "@material-ui/core";
import CreateContestForm from "../components/CreateContestForm";

const styles = theme => ({
  title: {
    textAlign: "center",
    margin: theme.spacing(5,0,4,0),
  },
  formContainer: {
    marginBottom: theme.spacing(2),
  },
})

const CreateContest = ({ classes }) => {
  return (
    <>
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item xs={8} sm={6} lg={4}>
          <Typography variant="h4" className={classes.title}>
            Create new contest
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={0} alignItems="center" justify="center" className={classes.formContainer}>
        <Grid item xs={12} sm={10}>
          <CreateContestForm />
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(styles)(CreateContest);