import React, { useState } from 'react';
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
    IconButton,
} from "@material-ui/core";
import {
  Info as InfoIcon,
} from "@material-ui/icons";

const styles = theme => ({
  firstRow: {
    margin: theme.spacing(5, 0),
  },
  title: {
    display: "inline-block",
    marginRight: theme.spacing(2),
    fontWeight: "bold",
  },
  prize: {
    display: "inline-block",
    color: "white",
    backgroundColor: theme.secondary,
    padding: theme.spacing(0.5, 1)
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  button: {
    padding: theme.spacing(2),
  },
  tabRoot: {
    flexGrow: 1,
  },
  tabHeader: {
    marginBottom: theme.spacing(5),
  },
  indicator: {
    backgroundColor: theme.secondary,
  },
  tabPanelContainer: {
    marginBottom: theme.spacing(4),
  },
  textContainer: {
    flexGrow: 1,
  },
  tabPanelLabel: {
    margin: theme.spacing(2),
  },
  contestDescription: {
    margin: theme.spacing(2, 4),
  },
  gridList: {
    padding: theme.spacing(2, 4),
  },
  icon: {
    color: "white",
  }
})

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <Typography component="div" role="tabpanel" hidden={value !== index} {...other}>
      <Box>{children}</Box>
    </Typography>
  )
}

const submitLink = React.forwardRef((props, ref) => {
  const { id } = props.match.params;
  return (
    <Link innerRef={ref} to={`${id}/submit`} {...props} />
  );
});

const ContestDetail = ({ classes, auth, contest, match, history }) => {
  const [tabPage, setTabPage] = useState(0);
  const { title, prize, creator, submissions } = contest;
  const isCreator = contest.creator._id === auth.user.userId;

  const handleInfoClick = (creator) => {
    history.push(`/profile/${creator._id}`)
  }
  console.log(contest);
  return (
    <>
      <Grid container className={classes.container}>
        <Grid container className={classes.firstRow} justify="space-between" alignItems="center">
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
              <Avatar alt={auth.user.email} src="" className={classes.avatar}/>
              <Typography variant="subtitle2">
                {`By ${creator.name}`}
              </Typography>
            </Grid>
          </Grid>
          {!isCreator && 
            <Grid>
              <Button variant="outlined" color="inherit" className={classes.button} component={submitLink} match={match}>
                  Submit Design
              </Button>
            </Grid>
          }
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
              <GridList cellHeight={260} className={classes.gridList} spacing={8} cols={4}>
                {submissions.length !== 0 ? submissions.map(submission => {
                  const { url, creator } = submission;
                  return (
                    <GridListTile key={url} cols={1}>
                      <img src={`${process.env.REACT_APP_S3_URL}/${url}`} alt={"tattoo"} />
                      <GridListTileBar
                        title={`by: ${creator.name}`}
                        actionIcon={
                          <IconButton aria-label={`info about ${creator}`} className={classes.icon}>
                            <InfoIcon onClick={() => handleInfoClick(creator)}/>
                          </IconButton>
                        }
                      />
                    </GridListTile>
                  )
                }) : (
                  <Grid container spacing={0} alignItems="center" justify="center" className={classes.textContainer}>
                    <Typography variant="h5">
                      No Submissions
                    </Typography>
                  </Grid>
                )}
              </GridList>
            </TabPanel>
            <TabPanel value={tabPage} index={1}>
              <Typography variant="h6" className={classes.tabPanelLabel}>
                Description
              </Typography>
              <Typography variant="body1" className={classes.contestDescription}>
                {contest.description}
              </Typography>
              <Typography variant="h6" className={classes.tabPanelLabel}>
                Designs I liked
              </Typography>
              <GridList cellHeight={260} className={classes.gridList} spacing={8} cols={4}>
                {contest.images && contest.images.map(image => (
                  <GridListTile key={image} cols={1}>
                    <img src={`${process.env.REACT_APP_S3_URL}/default/${image}`} alt={"tattoo"} />
                  </GridListTile>
                ))}
              </GridList>
            </TabPanel>
          </Box>
        </Paper>
      </Grid>
    </>
  )
}

const mapStateToProps = ({ auth }) => ({
  auth,
});

const enhance = compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps),
);

export default enhance(ContestDetail);