import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  Typography,
  Grid,
  withStyles,
  Avatar,
  Button,
  Tabs,
  Tab,
  Box,
  Paper,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton
} from "@material-ui/core";
import { Info as InfoIcon, Check } from "@material-ui/icons";
import axios from "axios";

const styles = theme => ({
  firstRow: {
    margin: theme.spacing(5, 0)
  },
  title: {
    display: "inline-block",
    marginRight: theme.spacing(2),
    fontWeight: "bold"
  },
  prize: {
    display: "inline-block",
    color: "white",
    backgroundColor: theme.secondary,
    padding: theme.spacing(0.5, 1)
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  button: {
    padding: theme.spacing(2)
  },
  tabRoot: {
    flexGrow: 1
  },
  tabHeader: {
    marginBottom: theme.spacing(5)
  },
  indicator: {
    backgroundColor: theme.secondary
  },
  tabPanelContainer: {
    marginBottom: theme.spacing(4)
  },
  textContainer: {
    flexGrow: 1
  },
  tabPanelLabel: {
    margin: theme.spacing(2)
  },
  contestDescription: {
    margin: theme.spacing(2, 4)
  },
  gridList: {
    padding: theme.spacing(2, 4)
  },
  icon: {
    color: "white"
  },
  gridListContainer: {
    position: "relative"
  },
  centered: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
});

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      <Box>{children}</Box>
    </Typography>
  );
};

const submitLink = React.forwardRef((props, ref) => {
  const { id } = props.match.params;
  return <Link innerRef={ref} to={`${id}/submit`} {...props} />;
});

const ContestDetail = ({ classes, auth, contest, match, history }) => {
  const [tabPage, setTabPage] = useState(0);
  const [subs, setSubs] = useState(null);
  const { title, prize, creator, submissions } = contest;
  const isCreator = contest.creator._id === auth.user.userId;

  const handleInfoClick = creator => {
    history.push(`/profile/${creator._id}`);
  };

  const chooseWinner = subId => {
    //check if authorized to choose winner -- do later
    //check deadline -- do later
    //send request to backend, get back all submissions then set in state
    //add conditional styling to dom element

    let url = "/contest/" + contest._id + "/subWinner?winner=" + subId;

    axios
      .put(url)
      .then(res => {
        console.log(res);
        setSubs(res.data);
      })
      .catch(err => console.log(err));
  };

  const url = `${process.env.REACT_APP_S3_URL}/${creator.profileUrl}`;
  return (
    <>
      <Grid container className={classes.container}>
        <Grid
          container
          className={classes.firstRow}
          justify="space-between"
          alignItems="center"
        >
          <Grid>
            <Grid container alignItems="center">
              <Typography variant="h5" className={classes.title}>
                {title}
              </Typography>
              <Typography variant="body2" className={classes.prize}>
                {`$${prize.toFixed(2)}`}
              </Typography>
            </Grid>
            <Grid container alignItems="center">
              <Avatar
                alt={auth.user.email}
                src={url}
                className={classes.avatar}
              />
              <Typography variant="subtitle2">
                {`By ${creator.name}`}
              </Typography>
            </Grid>
          </Grid>
          {!isCreator && (
            <Grid>
              <Button
                variant="outlined"
                color="inherit"
                className={classes.button}
                component={submitLink}
                match={match}
              >
                Submit Design
              </Button>
            </Grid>
          )}
        </Grid>
        <Paper className={classes.tabRoot}>
          <Tabs
            value={tabPage}
            onChange={(e, tabNum) => setTabPage(tabNum)}
            className={classes.tabHeader}
            classes={{ indicator: classes.indicator }}
            centered
            variant="fullWidth"
          >
            <Tab label={`Designs (${submissions.length})`} />
            <Tab label="Brief" />
          </Tabs>
          <Box className={classes.tabPanelContainer}>
            <TabPanel value={tabPage} index={0}>
              <GridList
                cellHeight={260}
                className={classes.gridList}
                spacing={8}
                cols={4}
              >
                {submissions.length !== 0 ? (
                  submissions.map(submission => {
                    const { url, creator, _id, winner } = submission;
                    console.log(submissions[0]);
                    if (subs && _id === subs.data._id || winner) {
                      return (
                        <GridListTile
                          key={url}
                          cols={1}
                          className={classes.gridListContainer}
                          onClick={() => chooseWinner(_id)}
                        >
                          <img
                            src={`${process.env.REACT_APP_S3_URL}/${url}`}
                            alt={"tattoo"}
                            style={{ opacity: "0.2" }}
                          />
                          <div className={classes.centered}>
                            <h1 style={{margin: '0'}}>
                              <strong>Winner</strong>
                            </h1>
                            <IconButton size="large" align="center" style={{padding: '0'}}>
                              <Check style={{ height: "3em", width: "3em", marginLeft: '5px' }} />
                            </IconButton>
                          </div>
                          <GridListTileBar
                            title={`by: ${creator.name}`}
                            actionIcon={
                              <IconButton
                                aria-label={`info about ${creator}`}
                                className={classes.icon}
                                onClick={() => handleInfoClick(creator)}
                              >
                                <InfoIcon />
                              </IconButton>
                            }
                          />
                        </GridListTile>
                      );
                    } else
                      return (
                        <GridListTile
                          key={url}
                          cols={1}
                          onClick={() => chooseWinner(_id)}
                        >
                          <img
                            src={`${process.env.REACT_APP_S3_URL}/${url}`}
                            alt={"tattoo"}
                          />
                          <GridListTileBar
                            title={`by: ${creator.name}`}
                            actionIcon={
                              <IconButton
                                aria-label={`info about ${creator}`}
                                className={classes.icon}
                                onClick={() => handleInfoClick(creator)}
                              >
                                <InfoIcon />
                              </IconButton>
                            }
                          />
                        </GridListTile>
                      );
                  })
                ) : (
                  <Grid
                    container
                    spacing={0}
                    alignItems="center"
                    justify="center"
                    className={classes.textContainer}
                  >
                    <Typography variant="h5">No Submissions</Typography>
                  </Grid>
                )}
              </GridList>
            </TabPanel>
            <TabPanel value={tabPage} index={1}>
              <Typography variant="h6" className={classes.tabPanelLabel}>
                Description
              </Typography>
              <Typography
                variant="body1"
                className={classes.contestDescription}
              >
                {contest.description}
              </Typography>
              <Typography variant="h6" className={classes.tabPanelLabel}>
                Designs I liked
              </Typography>
              <GridList
                cellHeight={260}
                className={classes.gridList}
                spacing={8}
                cols={4}
              >
                {contest.images &&
                  contest.images.map(image => (
                    <GridListTile key={image} cols={1}>
                      <img
                        src={`${process.env.REACT_APP_S3_URL}/default/${image}`}
                        alt={"tattoo"}
                      />
                    </GridListTile>
                  ))}
              </GridList>
            </TabPanel>
          </Box>
        </Paper>
      </Grid>
    </>
  );
};

const mapStateToProps = ({ auth }) => ({
  auth
});

const enhance = compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps)
);

export default enhance(ContestDetail);
