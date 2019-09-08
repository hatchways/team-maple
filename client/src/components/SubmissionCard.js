import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  withStyles,
} from '@material-ui/core/';
import { withRouter } from "react-router-dom";
import { grey } from "@material-ui/core/colors";

const styles = theme => ({
  card: {
    marginBottom: theme.spacing(1),
  },
  media: {
    height: 160,
    width: 160,
  },
  cardContent: {
    flexGrow: 1,
    margin: theme.spacing(0, 4),
  },
  cardTitle: {
    fontStyle: "bold",
  },
  cardDescription: {
    color: grey[500],
    marginBottom: theme.spacing(4),
  },
  cardPrize: {
    display: "inline-block",
    color: "white",
    backgroundColor: theme.secondary,
    padding: theme.spacing(0.5, 1)
  },
})

const SubmissionCard = ({ classes, imgUrl, title, description, prize, contestId, history }) => {
  const handleClick = () => {
    history.push(`/contest/${contestId}`);
  }
  return (
    <Card className={classes.card}>
      <CardActionArea onClick={handleClick}>
        <Grid container justify="space-between">
          <CardMedia className={classes.media} image={imgUrl} />
          <CardContent className={classes.cardContent}>
            <Typography variant="h6" className={classes.cardTitle}>
              {title}
            </Typography>
            <Typography variant="body1" className={classes.cardDescription}>
              {description}
            </Typography>
            <Typography variant="body2" className={classes.cardPrize}>
              {`$${prize.toFixed(2)}`}
            </Typography>
          </CardContent>
        </Grid>
      </CardActionArea>
    </Card>
  );
};


export default withRouter(withStyles(styles)(SubmissionCard));