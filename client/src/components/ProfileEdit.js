import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import {
  withStyles,
  Avatar,
  Grid,
  InputLabel,
  TextField,
  Button,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import setAuthToken from "../utils/setAuthToken";
import tokenStorage from "../utils/tokenStorage";
import { getProfile } from "../actions/profileActions";

const styles = theme => ({
  avatar: {
    margin: theme.spacing(2),
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  button: {
    backgroundColor: green[400],
  },
  uploadInput: {
    display: "none"
  }
})

const ProfileEdit = ({ classes, profile, getProfile, refresh, handleClose }) => {
  const { name, profileUrl } = profile;
  const [ newName, setNewName] = useState(name);
  const [ nameChanged, setNameChanged ] = useState(false);
  const [ file, setFile ] = useState(null);
  const [ imgSrc, setImgSrc] = useState(profileUrl ? `${process.env.REACT_APP_S3_URL}/${profileUrl}` : "")
  const [ submitting, setSubmitting] = useState(false);
  const handleSelect = e => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setImgSrc(URL.createObjectURL(e.target.files[0]));
    }
  }
  const handleNameChange = e => {
    setNewName(e.target.value);
    setNameChanged(true);
  }

  const handleSubmit = async () => {
    setSubmitting(true);
    if (file) {
      const uploadConfig = await axios.get("/upload/profile");

      setAuthToken();
      await axios.put(uploadConfig.data.url, file, {
        headers: {
          "Content-type": file.type,
          "Cache-Control": "public, max-age=31536000"
        },
      });
      setAuthToken(tokenStorage.getAuthToken());

      await axios.patch("/profile", {
        name: newName,
        profileUrl: uploadConfig.data.key,
      });

      await refetch();
    } else if (nameChanged && !file) {
      await axios.patch("/profile", {
        name: newName,
      });

      await refetch();
    } else {
      setSubmitting(false);
    }
  }
  const refetch = async () => {
    getProfile(profile.id);
    await refresh();
    handleClose();
  }
  return (
    <>
      <Grid container alignItems="center" justify="center">
        <Avatar
          alt={name}
          src={imgSrc}
          className={classes.avatar}
        />
      </Grid>
      <Grid container alignItems="center" justify="flex-end">
        <Button variant="contained" component="label">
          Upload file
          <input accept="image/*" type="file" onChange={handleSelect} className={classes.uploadInput} />
        </Button>
      </Grid>
      <Grid container>
        <InputLabel className={classes.label}>Name</InputLabel>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          placeholder="Write your name"
          required
          value={newName}
          onChange={handleNameChange}
        />
      </Grid>
      <Grid container alignItems="center" justify="flex-end">
        <Button variant="outlined" className={classes.button} onClick={handleSubmit} disabled={submitting}>
            Save Changes
        </Button>
      </Grid>
    </>
  )
}

const mapDispatchToProps = {
  getProfile,
};

const enhance = compose(
  withStyles(styles),
  connect(null, mapDispatchToProps),
);

export default enhance(ProfileEdit);