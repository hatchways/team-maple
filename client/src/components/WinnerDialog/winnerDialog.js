import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  withStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@material-ui/core";

const styles = theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%"
  },
  cardContent: {
    flexGrow: 1
  }
});

export default withStyles(styles)(props => {
  const {
    open,
    handleClose,
    chooseWinner,
    classes,
    sub,
    contest,
    isCreator
  } = props;
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">{contest.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{contest.description}</DialogContentText>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={sub ? `${process.env.REACT_APP_S3_URL}/${sub.url}` : ""}
              title="Image Title"
            />
            <CardContent className={classes.cardContent}>
              <Typography>{sub ? sub.creator.name : null}</Typography>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>

          <Button onClick={chooseWinner} color="primary">
            Select
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
