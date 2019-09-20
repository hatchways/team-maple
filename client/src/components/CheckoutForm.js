import React, { useState } from 'react';
import axios from "axios";
import { CardElement, injectStripe } from 'react-stripe-elements';

const CheckoutForm = props => {
  const [complete, setComplete] = useState(false);
  const handleSubmit = async e => {
    console.log(e.target.value);
    let { token } = await props.stripe.createToken({ name: "Name" });

    let response = await axios.post("/stripe/charge", {
      id: token.id,
    });
    console.log(response);
    if (response.ok) setComplete(true); 
  }

  if (complete) {
    return <h1>purchase complete</h1>
  };

  return (
    <div className="checkout">
      <p>Would you like to complete the purchase?</p>
      <CardElement />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
};

export default injectStripe(CheckoutForm);
