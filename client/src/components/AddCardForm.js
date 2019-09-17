import React, { useState } from 'react';
import axios from "axios";
import { compose } from "redux";
import { CardElement, injectStripe } from 'react-stripe-elements';

import {
  Button,
  withStyles,
} from "@material-ui/core";

const styles = theme => ({
  button: {
    padding: theme.spacing(1, 3),
  }
})

const AddCardForm = ({ classes, stripe, getCardDetails }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleStartSetup = async e => {
    try {
      const res = await axios.get("/stripe/setupIntent");
      console.log(res);
      setClientSecret(res.data.clientSecret);
      setDisabled(false);
    } catch (e) {
      console.log(e);
    }
  }
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setDisabled(true);
      setProcessing(true);
      
      const payload = await stripe.handleCardSetup(clientSecret);
      console.log(payload);
      if (payload.error) {
        setError(`Error: ${payload.error.message}`);
      } else {
        setSucceeded(true);
        console.log('[SetupIntent]', payload.setupIntent);
        await axios.post("/stripe/addCard", { setupIntent: payload.setupIntent });

        await getCardDetails();
        setClientSecret(null);
      }
      setDisabled(false);
      setProcessing(false);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div>
      { !clientSecret ? 
        <Button variant="outlined" color="inherit" className={classes.button} onClick={handleStartSetup}>
            Add Card
        </Button>
        :
        <form onSubmit={handleSubmit}>
          <CardElement />
          {error && <div className="error">{error}</div> }
          {!succeeded && (
            <Button
              variant="outlined"
              color="inherit"
              className={classes.button}
              disabled={disabled}
              type="submit"
            >
               {processing ? 'Processing' : 'Setup'}
            </Button>
          )}
        </form>
      }
    </div>
  );
};

const enhance = compose(
  withStyles(styles),
  injectStripe,
);

export default enhance(AddCardForm);
