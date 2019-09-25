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
  },
  toc: {
    marginTop: theme.spacing(2),
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
              <Typography>{sub ? `Submitted by: ${sub.creator.name}` : null}</Typography>
              { isCreator &&
                <Typography className={classes.toc}>
                  {
                    `By selecting this submission, you agree to pay 
                    $${contest.prize.toFixed(2)} to 
                    ${sub ? sub.creator.name : "this submission's creator"}`
                  }
                </Typography>
              }
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>

          {isCreator ? (
            <Button
              onClick={() => chooseWinner(sub)}
              color="primary"
              disabled={typeof contest.winner === "string"}
            >
              Select
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </div>
  );
});
