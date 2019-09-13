import React, { useState, useEffect } from "react";
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
import { Info as InfoIcon, CheckOutlined } from "@material-ui/icons";
import axios from "axios";
import WinnerDialog from "./WinnerDialog/winnerDialog";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
    color: "white",
  },
  clickable: {
    cursor: "pointer",
  },
  gridListContainer: {
    position: "relative"
  },
  centered: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  selectedImage: {
    opacity: "0.2"
  },
  checkOutLined: {
    height: "3em",
    width: "3em",
    marginLeft: "5px"
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


const ContestDetail = ({ classes, auth, match, history }) => {
  const [tabPage, setTabPage] = useState(0);
  const [sub, setSub] = useState(null);
  const [open, setOpen] = useState(false);
  const [contest, setContest] = useState(null);

  useEffect(() => {
    const getContestDetails = async () => {
      const { data } = await axios.get(`/contest/${match.params.id}`);
      setContest(data);
    };
    getContestDetails();
  }, []);

  const handleInfoClick = creator => {
    history.push(`/profile/${creator._id}`);
  };

  const chooseWinner = subId => {
    let url = "/contest/" + contest._id + "/subWinner?winner=" + subId;
    const isCreator = contest.creator._id === auth.user.userId;


    if (contest.winner) {
      console.log('winner already chosen');
      return;
    }

    if (isCreator) {
      if (new Date() <= new Date(contest.deadline)) {
        if (!contest.winner) {
          axios
            .put(url)
            .then(res => {
              console.log(res);
              setContest(res.data.contest);
              handleClose();
            })
            .catch(err => console.log(err));
        } else {
          console.log("already picked a winner");
        }
      } else {
        console.log("contest still running");
      }
    } else {
      console.log("only contest creator can choose a winner");
    }
  };

  function handleClickOpen(submission) {
    setSub(submission);
    setOpen(true);
  }

  const handleCreatorClick = () => {
    history.push(`/profile/${contest.creator._id}`);
  };

  function handleClose() {
    setOpen(false);
  }
  
  const url = contest ? `${process.env.REACT_APP_S3_URL}/${contest.creator.profileUrl}` : '';
  return (
    <>
      {contest ? <Grid container className={classes.container}>
        <WinnerDialog
          open={open}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
          sub={sub}
          contest={contest}
          chooseWinner={chooseWinner}
          isCreator={contest.creator._id === auth.user.userId}
        />
        <Grid
          container
          className={classes.firstRow}
          justify="space-between"
          alignItems="center"
        >
          <Grid>
            <Grid container alignItems="center">
              <Typography variant="h5" className={classes.title}>
                {contest.title}
              </Typography>
              <Typography variant="body2" className={classes.prize}>
                {`$${contest.prize.toFixed(2)}`}
              </Typography>
            </Grid>
            <Grid container alignItems="center">
              <Avatar alt={auth.user.email} src={url} className={`${classes.avatar} ${classes.clickable}`} onClick={handleCreatorClick} />
              <Typography variant="subtitle2" onClick={handleCreatorClick} className={classes.clickable}>
                {`By ${creator.name}`}
              </Typography>
            </Grid>
          </Grid>
          {contest.creator._id !== auth.user.userId && (
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
            <Tab label={`Designs (${contest.submissions.length})`} />
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
                {contest.submissions.length !== 0 ? (
                  contest.submissions.map(submission => {
                    const { url, creator, _id } = submission;
                    if (
                      contest.winner &&
                      contest.winner.toString() === _id.toString()
                    ) {
                      return (
                        <GridListTile
                          key={url}
                          cols={1}
                          className={classes.gridListContainer}
                          onClick={() => handleClickOpen(submission)}
                        >
                          <img
                            src={`${process.env.REACT_APP_S3_URL}/${url}`}
                            alt={"tattoo"}
                            className={classes.selectedImage}
                          />
                          <div className={classes.centered}>
                            <h1 style={{ margin: "0" }}>
                              <strong>Winner</strong>
                            </h1>
                            <IconButton align="center" style={{ padding: "0" }}>
                              <CheckOutlined
                                className={classes.checkOutLined}
                              />
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
                          onClick={() => handleClickOpen(submission)}
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
      </Grid>: null}
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
