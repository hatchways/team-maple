import React from 'react';
import {
  withStyles,
  TextField,
  Grid,
  Paper,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core/';

export const BANK_ACCOUNT_FORM_COUNTRY = 'country';
export const BANK_ACCOUNT_FORM_CURRENCY = 'currency';
export const BANK_ACCOUNT_FORM_ROUTING_NUMBER = 'routing_number';
export const BANK_ACCOUNT_FORM_ACCOUNT_NUMBER = 'account_number';
export const BANK_ACCOUNT_FORM_ACCOUNT_HOLDER_NAME = 'account_holder_name';
export const BANK_ACCOUNT_FORM_ACCOUNT_HOLDER_TYPE = 'account_holder_type';

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
  },
})

const BankAccountForm = (props) => {
  const {
    onChangeFunc,
    countryValue,
    currencyValue,
    routingNumberValue,
    accountNumberValue,
    accountHolderNameValue,
    accountHolderTypeValue,
    classes,
  } = props;
  return (
    <>
      <Typography>
        Bank Account Details
      </Typography>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={5}>
          <TextField
            label="Branch Number"
            value={routingNumberValue}
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={(e) => onChangeFunc(e, "routing_number")}
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            label="Account Number"
            value={accountNumberValue}
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={(e) => onChangeFunc(e, "account_number")}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            label="Account Holder"
            value={accountHolderNameValue}
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={(e) => onChangeFunc(e, "account_holder_name")}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="country"
            value={countryValue}
            margin="normal"
            variant="outlined"
            disabled
            onChange={(e) => onChangeFunc(e, "country")}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="currency"
            value={currencyValue}
            margin="normal"
            variant="outlined"
            disabled
            onChange={(e) => onChangeFunc(e, "currency")}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Account Type"
            value={accountHolderTypeValue}
            margin="normal"
            variant="outlined"
            disabled
            onChange={(e) => onChangeFunc(e, "account_holder_type")}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(BankAccountForm);