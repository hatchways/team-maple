import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  withStyles,
  Typography,
  Avatar,
  Grid,
  Button,
  Modal,
} from "@material-ui/core";
import ProfileEdit from "./ProfileEdit";
import { startConversation } from "../actions/socketActions";

const styles = theme => ({
  avatar: {
    margin: theme.spacing(2),
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  button: {
    margin: theme.spacing(2),
  },
  modalContainer: {
    top: '50%',
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid black",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
  },
})

const ProfileImage = ({ classes, profile, auth, refresh, startConversation, match, history }) => {
  const { name, profileUrl } = profile;
  const [open, setOpen] = useState(false);
  const isUser = auth.user.userId === profile.id;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleMessage = (e) => {
    e.preventDefault();
    const body = {
      other: match.params.id,
    }
    startConversation(body);
    history.push("/chat");
  }
  return (
    <>
      <Grid container alignItems="center" justify="center">
        <Avatar
          alt={name}
          src={profileUrl ? `${process.env.REACT_APP_S3_URL}/${profileUrl}` : ""}
          className={classes.avatar}
        />
      </Grid>
      <Grid container alignItems="center" justify="center">
        <Typography variant="h4">
          {name}
        </Typography>
      </Grid>
      <Grid container alignItems="center" justify="center">
        { isUser ?
          <Button variant="outlined" className={classes.button} onClick={handleOpen}>
              Edit Profile
          </Button>
          :
          <Button variant="outlined" className={classes.button} onClick={handleMessage}>
              Message User
          </Button>
        }
      </Grid>
      { isUser &&
        <Modal
          aria-labelledby="edit user details"
          open={open}
          onClose={handleClose}
          className={classes.modal}
        >
          <div className={classes.modalContainer}>
            <ProfileEdit profile={profile} refresh={refresh} handleClose={handleClose}/>
          </div>
        </Modal>
      }
    </>
  )
}

const mapStateToProps = ({ auth }) => ({
  auth,
});

const enhance = compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, { startConversation }),
)

export default enhance(ProfileImage);