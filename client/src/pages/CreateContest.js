import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import {
  withStyles,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import CreateContestForm from "../components/CreateContestForm";

const styles = theme => ({
  title: {
    textAlign: "center",
    margin: theme.spacing(5,0,4,0),
  },
  formContainer: {
    marginBottom: theme.spacing(2),
  },
})

const CreateContest = ({ classes, history }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const listCards = async () => {
      const response = await axios.get("/stripe/listCards");
      if (response.data.status === "error") {
        setOpen(true);
      }
    }
    listCards();
  }, []);
  const handleClose = () => {
    setOpen(false);
    history.push("/payment");
  }
  return (
    <>
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item xs={8} sm={6} lg={4}>
          <Typography variant="h4" className={classes.title}>
            Create new contest
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={0} alignItems="center" justify="center" className={classes.formContainer}>
        <Grid item xs={12} sm={10}>
          <CreateContestForm />
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="No Credit Card Added"
        aria-describedby="Credit card needed for creating contests"
      >
        <DialogTitle id="alert-dialog-title">{"Add a credit card"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please add a credit card to your account before creating a contest
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default withRouter(withStyles(styles)(CreateContest));