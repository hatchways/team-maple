import React, { useState, useEffect } from 'react';
import axios from "axios";
import { CardElement, injectStripe } from 'react-stripe-elements';

import {
  Typography,
} from "@material-ui/core";

const AddCardForm = ({ stripe, getCardDetails }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState(null);

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
        setMessage(`Setup succeeded! SetupIntent is in state: ${
          payload.setupIntent.status
        }`);
        console.log('[SetupIntent]', payload.setupIntent);
        const res = await axios.post("/stripe/addCard", { setupIntent: payload.setupIntent });

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
    <div className="checkout">
      { !clientSecret ? 
        <button onClick={handleStartSetup}>Add a card</button>
        :
        <form onSubmit={handleSubmit}>
          <CardElement />
          {error && <div className="error">{error}</div> }
          {message && <div className="message">{message}</div> }
          {!succeeded && (
            <button disabled={disabled}>
              {processing ? 'Processing' : 'Setup'}
            </button>
          )}
        </form>
      }
    </div>
  );
};

export default injectStripe(AddCardForm);
