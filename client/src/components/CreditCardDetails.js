import React from "react";
import {
  Typography,
  withStyles,
} from '@material-ui/core/';

const styles = theme => ({

})

const CreditCardDetails = ({ classes, card }) => {
 
  return (
    <div>
      <Typography>
        {`Brand: ${card.brand}`}
      </Typography>
      <Typography>
        {`Card Number: XXXX XXXX XXXX ${card.last4}`}
      </Typography>
      <Typography>
        {`Expiry Date: ${card.exp_month}/${card.exp_year}`}
      </Typography>
    </div>
  );
};


export default withStyles(styles)(CreditCardDetails);