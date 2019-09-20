import React from 'react';
import {
  Typography,
  withStyles,
} from "@material-ui/core";
import CreditCardDetails from "./CreditCardDetails";

const styles = theme => ({

})

const ListCreditCards = ({ cards }) => {
  return (
    <div>
      { cards ? cards.map(card => {
        return (
          <CreditCardDetails key={card.id} card={card.card} />
        );
      })
      :
      <Typography>
        No cards added
      </Typography>
      }
    </div>
  );
};

export default withStyles(styles)(ListCreditCards);
