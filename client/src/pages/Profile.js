import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  withStyles,
  Grid,
} from "@material-ui/core";
import ProfileImage from "../components/ProfileImage";

const styles = theme => ({
  firstRow: {
    marginTop: theme.spacing(5),
  }
})

const Profile = ({ classes, match }) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const getProfileDetails = async () => {
      const { data } = await axios.get(`/profile/${match.params.id}`);
      setProfile(data);
      setLoading(false);
    }
    getProfileDetails();
  }, []);
  return (
    <>
      {!loading && 
        <Grid container spacing={0} alignItems="center" justify="center">
          <Grid item xs={4} className={classes.firstRow}>
            <ProfileImage profile={profile} />         
          </Grid>
          <Grid item xs={12} sm={10}>
            YAY
          </Grid>
        </Grid>
      }
    </>
  )
}

export default withStyles(styles)(Profile);