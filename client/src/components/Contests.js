import React from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  container: {
    padding: 20
  },

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
}));

export default withRouter(({ cards, selectContest, history }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Grid container spacing={4} className={classes.container}>
        {cards.length > 0
          ? cards.map(card => (
              <Grid item key={card._id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={
                      card.submissions.length > 0
                        ? `${process.env.REACT_APP_S3_URL}/${card.submissions[Math.floor(Math.random() * card.submissions.length)].url}`
                        : ""
                    }
                    title="Image Title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2">
                      <span
                        style={{
                          color: "red",
                          fontWeight: "150",
                          fontStyle: "italic"
                        }}
                      >
                        ${card.prize}
                      </span>
                    </Typography>
                    <Typography>{card.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      onClick={() => selectContest(card._id)}
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          : null}
      </Grid>
    </Container>
  );
});
