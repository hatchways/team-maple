import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  withStyles,
  Typography,
  Avatar,
  Grid,
  Button,
  Modal,
} from "@material-ui/core";
import ProfileEdit from "./ProfileEdit";

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

const ProfileImage = ({ classes, profile, auth, refresh }) => {
  const { name, profileUrl } = profile;
  const [open, setOpen] = useState(false);
  const isUser = auth.user.userId === profile.id;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
        { isUser &&
          <Button variant="outlined" className={classes.button} onClick={handleOpen}>
              Edit Profile
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
  withStyles(styles),
  connect(mapStateToProps),
)

export default enhance(ProfileImage);