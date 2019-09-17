import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Elements, StripeProvider } from 'react-stripe-elements';
import {
  Grid,
  Typography,
  withStyles,
} from "@material-ui/core";
import AddCardForm from '../components/AddCardForm';
import ListCreditCards from '../components/ListCreditCards';

const styles = theme => ({
  container: {
    padding: theme.spacing(3, 5),
  },
  titleRow: {
    marginBottom: theme.spacing(3),
  },
  subtitleRow: {
    marginBottom: theme.spacing(3),
  },
})

const PaymentDetails = ({ classes }) => {
  const [cards, setCards] = useState(null);

  const getCardDetails = async () => {
    const { data: response } = await axios.get("/stripe/listCards");
    if (response.status === "success") {
      setCards(response.paymentMethods.data);
    }
    // else keep as null as no card added for customer
  };
  useEffect(() => {
    getCardDetails();
  }, []);
  return (
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
      <>
        <Grid container className={classes.container} justify="center">
          <Grid item xs={12} className={classes.titleRow}>
            <Typography variant="h4" align="center">
              Payment Details
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} className={classes.subtitleRow}>
            <Typography variant="h6" align="center">
              Cards Registered
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={3} align="center">
            <ListCreditCards cards={cards} />
          </Grid>
        </Grid>
        <Elements>
          <AddCardForm getCardDetails={getCardDetails} />
        </Elements>
      </>
    </StripeProvider>
  )
}

export default withStyles(styles)(PaymentDetails);
