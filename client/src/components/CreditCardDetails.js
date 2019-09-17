import React from "react";
import {
  withStyles,
  TextField,
  Grid,
  Paper,
} from '@material-ui/core/';

const styles = theme => ({
  container: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
})

const CreditCardDetails = ({ classes, card }) => {
 
  return (
    <Paper className={classes.container}>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12}>
          <TextField
            id="filled-name"
            label="Card Number"
            className={classes.textField}
            value={`XXXX XXXX XXXX ${card.last4}`}
            disabled
            fullWidth
            margin="normal"
            variant="filled"
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            id="filled-name"
            label="Card Expiry"
            className={classes.textField}
            value={`${card.exp_month}/${ card.exp_year.toString().substring(2)}`}
            disabled
            margin="normal"
            variant="filled"
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            id="filled-name"
            label="Card Type"
            className={classes.textField}
            value={`${card.brand}`}
            disabled
            margin="normal"
            variant="filled"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};


export default withStyles(styles)(CreditCardDetails);