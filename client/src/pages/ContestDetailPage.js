import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  withStyles,
  Grid,
} from "@material-ui/core";
import ContestDetail from "../components/ContestDetail";

const styles = theme => ({

})

const CreateContest = ({ classes, match }) => {
  const [loading, setLoading] = useState(true);
  const [contest, setContest] = useState(null);
  useEffect(() => {
    const getContestDetails = async () => {
      const { data } = await axios.get(`/contest/${match.params.id}`);
      setContest(data);
      setLoading(false);
    }
    getContestDetails();
  }, []);
  return (
    <>
      {!loading && 
        <Grid container spacing={0} alignItems="center" justify="center">
          <Grid item xs={12} sm={10}>
            <ContestDetail contest={contest} match={match}/>
          </Grid>
        </Grid>
      }
    </>
  )
}

export default withStyles(styles)(CreateContest);