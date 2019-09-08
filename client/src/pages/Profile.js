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
import ProfileCard from "../components/ProfileCard";

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
  sectionHeader: {
    margin: theme.spacing(8, 0, 0),
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
  const [subTabPage, setSubTabPage] = useState(0);
  const [ contestTabPage, setContestTabPage] = useState(0);
  
  useEffect(() => {
    const getProfileDetails = async () => {
      const { data } = await axios.get(`/profile/${match.params.id}`);
      setProfile(data);
      setLoading(false);
    }
    getProfileDetails();
  }, [match.params.id]);

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

  const completedContest = [];
  const inProgressContest = !loading && profile.contests.filter(contest => {
    if (contest.status === "COMPLETED") {
      completedSub.push(contest);
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

          <Grid container alignItems="center" justify="center" className={classes.sectionHeader}>
            <Typography variant="h4" justify="center">
              Contests
            </Typography>
          </Grid>

          <Grid item xs={12} sm={10}>
            <Tabs
                value={contestTabPage}
                onChange={(e, tabNum) => setContestTabPage(tabNum)}
                classes={{ indicator: classes.indicator }}
                centered
                variant="fullWidth"
              >
              <Tab label="IN PROGRESS" />
              <Tab label="COMPLETED" />
            </Tabs>
            <Paper className={classes.tabPanelContainer}>
              <TabPanel value={contestTabPage} index={0}>
                {
                  inProgressContest.length > 0 ? inProgressContest.map(contest => {
                    const { title, description, prize, id  } = contest;
                    const { url } = contest.submissions[0] ? contest.submissions[0] : "";
                    const imgSubTitle = contest.submissions.length;
                    return (
                      <ProfileCard
                        key={id}
                        title={title}
                        description={description}
                        prize={prize}
                        imgUrl={url ? `${process.env.REACT_APP_S3_URL}/${url}` : ""}
                        contestId={id}
                        imgSubTitle={imgSubTitle}
                      />
                    );
                      }) : (
                    <NoSubmissions />
                    )
                }
              </TabPanel>
              <TabPanel value={contestTabPage} index={1}>
                {
                  completedContest.length > 0 ? completedContest.map(contest => {
                    const { title, description, prize, id  } = contest;
                    const { url } = contest.submissions[0] ? contest.submissions[0] : "";
                    const imgSubTitle = contest.submissions.length;
                    return (
                      <ProfileCard
                        key={id}
                        title={title}
                        description={description}
                        prize={prize}
                        imgUrl={url ? `${process.env.REACT_APP_S3_URL}/${url}` : ""}
                        contestId={id}
                        imgSubTitle={imgSubTitle}
                      />
                    );
                  }) : (
                    <NoSubmissions />
                  )
                }
              </TabPanel>
            </Paper>
          </Grid>

          <Grid container alignItems="center" justify="center" className={classes.sectionHeader}>
            <Typography variant="h4" justify="center">
              Submissions
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={10}>
            <Tabs
                value={subTabPage}
                onChange={(e, tabNum) => setSubTabPage(tabNum)}
                classes={{ indicator: classes.indicator }}
                centered
                variant="fullWidth"
              >
              <Tab label="IN PROGRESS" />
              <Tab label="COMPLETED" />
            </Tabs>
            <Paper className={classes.tabPanelContainer}>
              <TabPanel value={subTabPage} index={0}>
                {
                  inProgressSub.length > 0 ? inProgressSub.map(submission => {
                    const { title, description, prize, id: contestId } = submission.contest;
                    const { _id: key, url} = submission;
                    return (
                      <ProfileCard
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
              <TabPanel value={subTabPage} index={1}>
                {
                  completedSub.length > 0 ? completedSub.map(submission => {
                    const { title, description, prize, id: contestId } = submission.contest;
                    const { _id: key, url} = submission;
                    return (
                      <ProfileCard
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
            </Paper>
          </Grid>
        </Grid>
      }
    </>
  )
}

export default withStyles(styles)(Profile);