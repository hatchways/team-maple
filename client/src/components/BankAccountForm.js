import React, { useState } from "react";
import { injectStripe } from "react-stripe-elements";
import {
  withStyles,
  Paper,
  Button,
  Grid,
} from '@material-ui/core/';
import BankAccountSection from "./BankAccountSection";

const styles = theme => ({
  container: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
})

const BankAccountForm = ({ stripe, onSaveAccount, classes }) => {
  const [submitting, setSubmitting] = useState(false);
  const [country, setCountry ] = useState("CA");
  const [currency, setCurrency] = useState("CAD");
  const [routingNumber, setRoutingNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountHolderType, setAccountHolderType] = useState("individual");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true); 
    stripe.createToken("bank_account", {
      country,
      currency,
      routing_number: routingNumber,
      account_number: accountNumber,
      account_holder_name: accountHolderName,
      account_holder_type: accountHolderType,
    }).then(({ error, token }) => {
      console.log("Received Stripe token: ", token);
      console.log("Received Stripe error: ", error);
      const { id } = token;
      onSaveAccount(id);
    }).catch(err => {
      console.log(err);
    })
    setSubmitting(false);
  }

  const onTextboxChange = (e, textBoxKey) => {
    if (textBoxKey === "country") {
      setCountry(e.target.value);
    } else if (textBoxKey === "currency") {
      setCurrency(e.target.value);
    } else if (textBoxKey === "routing_number") {
      setRoutingNumber(e.target.value);
    } else if (textBoxKey === "account_number") {
      setAccountNumber(e.target.value);
    } else if (textBoxKey === "account_holder_name") {
      setAccountHolderName(e.target.value);
    } else if (textBoxKey === "account_holder_type") {
      setAccountHolderType(e.target.value);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <Paper className={classes.container}>
        <BankAccountSection
          onChangeFunc={onTextboxChange}
          countryValue={country}
          currencyValue={currency}
          routingNumberValue={routingNumber}
          accountNumberValue={accountNumber}
          accountHolderNameValue={accountHolderName}
          accountHolderTypeValue={accountHolderType}
        />
        <Grid container alignItems="center" justify="flex-end">
          <Button type="submit" variant="outlined" disabled={submitting}>
              Save Bank Account
          </Button>
        </Grid>
      </Paper>
    </form>
  );
};

export default withStyles(styles)(injectStripe(BankAccountForm));