import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Elements, StripeProvider } from 'react-stripe-elements';
import {
  Grid,
  Typography,
} from "@material-ui/core";
import AddCardForm from '../components/AddCardForm';
import ListCreditCards from '../components/ListCreditCards';

const PaymentDetails = () => {
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
      <Grid>
        <Typography variant="h4">
          Payment Details
        </Typography>
        <Typography>
          Cards Registered
        </Typography>
        <ListCreditCards cards={cards} />
        <Elements>
          <AddCardForm getCardDetails={getCardDetails} />
        </Elements>
      </Grid>
    </StripeProvider>
  )
}

export default PaymentDetails;
