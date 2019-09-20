import React, { useState } from 'react';
import axios from "axios";
import { compose } from "redux";
import { CardElement, injectStripe } from 'react-stripe-elements';

import {
  Button,
  withStyles,
  Grid,
  Typography,
} from "@material-ui/core";

const styles = theme => ({
  button: {
    padding: theme.spacing(1, 3),
  },
  cardContainer: {
    margin: theme.spacing(2),
  },
  buttonContainer: {
    margin: theme.spacing(2, 0),
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
      if (payload.error) {
        setError(`Error: ${payload.error.message}`);
      } else {
        setSucceeded(true);
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
        <Grid container alignItems="center" justify="center" className={classes.buttonContainer}>  
          <Button variant="outlined" color="inherit" className={classes.button} onClick={handleStartSetup}>
              Add Card
          </Button>
        </Grid>
        :
        <form onSubmit={handleSubmit}>
          <Grid container alignItems="center" justify="center" className={classes.cardContainer}>
            <Grid item xs={6}>
              <CardElement style={{
                base: {
                  fontSize: "18px",
                },
              }}/>
            </Grid>
          </Grid>
          {error && 
            <Typography variant="h6" align="center">
              {error}
            </Typography>
          }
          {!succeeded && (
            <Grid container alignItems="center" justify="center" className={classes.buttonContainer}>
              <Button
                variant="outlined"
                color="inherit"
                className={classes.button}
                disabled={disabled}
                type="submit"
              >
                {processing ? 'Processing' : 'Setup'}
              </Button>
            </Grid>
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
