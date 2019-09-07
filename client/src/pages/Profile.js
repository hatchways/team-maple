import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  withStyles,
  Grid,
} from "@material-ui/core";

const styles = theme => ({

})

const Profile = ({ classes, match }) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const getProfileDetails = async () => {
      const { data } = await axios.get(`/profile/${match.params.id}`);
      setProfile(profile);
      setLoading(false);
    }
    getProfileDetails();
  }, []);
  return (
    <>
      {!loading && 
        <Grid container spacing={0} alignItems="center" justify="center">
          <Grid item xs={12} sm={10}>
            YAY
          </Grid>
        </Grid>
      }
    </>
  )
}

export default withStyles(styles)(Profile);