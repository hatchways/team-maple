import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  withStyles,
  Grid,
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
} from "@material-ui/core";
import ProfileImage from "../components/ProfileImage";
import SubmissionCard from "../components/SubmissionCard";

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <Typography component="div" role="tabpanel" hidden={value !== index} {...other}>
      <Box>{children}</Box>
    </Typography>
  )
}

const styles = theme => ({
  firstRow: {
    marginTop: theme.spacing(5),
  },
  tabHeader: {
    marginTop: theme.spacing(5),
  },
  tabPanelContainer: {
    padding: theme.spacing(4, 6),
  },
  indicator: {
    backgroundColor: theme.secondary,
  },
})

const NoSubmissions = () => (
 <Grid container spacing={0} alignItems="center" justify="center" styles={{ flexGrow: 1 }}>
   <Typography variant="h5">
     No Submissions
   </Typography>
 </Grid>
);

const Profile = ({ classes, match }) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [tabPage, setTabPage] = useState(0);
  
  useEffect(() => {
    const getProfileDetails = async () => {
      const { data } = await axios.get(`/profile/${match.params.id}`);
      setProfile(data);
      setLoading(false);
    }
    getProfileDetails();
  }, []);

  const refresh = async () => {
    const { data } = await axios.get(`/profile/${match.params.id}`);
    setProfile(data);
  };
  
  const completedSub = [];
  const inProgressSub = !loading && profile.submissions.filter(submission => {
    if (submission.contest.status === "COMPLETED") {
      completedSub.push(submission);
    } else {
      return true;
    }
  });

  return (
    <>
      {!loading && 
        <Grid container spacing={0} alignItems="center" justify="center">
          <Grid item xs={4} className={classes.firstRow}>
            <ProfileImage profile={profile} refresh={refresh} />         
          </Grid>
          <Grid item xs={12} sm={10}>
            <Tabs
                value={tabPage}
                onChange={(e, tabNum) => setTabPage(tabNum)}
                className={classes.tabHeader}
                classes={{ indicator: classes.indicator }}
                centered
                variant="fullWidth"
              >
              <Tab label="IN PROGRESS" />
              <Tab label="COMPLETED" />
            </Tabs>
            <Paper className={classes.tabPanelContainer}>
              <TabPanel value={tabPage} index={0}>
                {
                  inProgressSub.length > 0 ? inProgressSub.map(submission => {
                    const { title, description, prize, id: contestId } = submission.contest;
                    const { _id: key, url} = submission;
                    return (
                      <SubmissionCard
                        key={key}
                        title={title}
                        description={description}
                        prize={prize}
                        imgUrl={`${process.env.REACT_APP_S3_URL}/${url}`}
                        contestId={contestId}
                      />
                    );
                  }) : (
                    <NoSubmissions />
                  )
                }
              </TabPanel>
              <TabPanel value={tabPage} index={1}>
                {
                  completedSub.length > 0 ? completedSub.map(submission => {
                    const { title, description, prize } = submission.contest;
                    const { _id: key, url} = submission;
                    return (
                      <SubmissionCard
                        key={key}
                        title={title}
                        description={description}
                        prize={prize}
                        imgUrl={`${process.env.REACT_APP_S3_URL}/${url}`}
                      />
                    );
                  }) : (
                    <NoSubmissions />
                  )
                }
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      }
    </>
  )
}

export default withStyles(styles)(Profile);