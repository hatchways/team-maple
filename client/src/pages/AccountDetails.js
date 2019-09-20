import React, { useState, useEffect } from "react";
import { Elements } from "react-stripe-elements";
import axios from "axios";
import {
  withStyles,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  Link,
  CircularProgress,
} from "@material-ui/core/";
import BankAccountForm from "../components/BankAccountForm";

const styles = theme => ({
  loaderContainer: {
    marginTop: theme.spacing(5),
    display: "flex",
    justifyContent: "center",
  },
  container: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
  },
  tosText: {
    margin: theme.spacing(2),
  },
  personalTitle: {
    margin: theme.spacing(2),
  },
  buttonContainer: {
    marginTop: theme.spacing(2),
  }
})

const AccountDetails = ({ classes }) => {
  const [setupBegan, setSetupBegan] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [account, setAccount] = useState(null);
  const [fieldsNeededForm, setFieldsNeededForm] = useState({ "type": "individual" });
  
  // Called first to see if account exists to skip account initialization
  const fetchAccount = async () => {
    const res = await axios.post("/stripe/account/get");
    const { success, message, setupBegan, account } = res.data;

    if (success) {
      setSetupBegan(setupBegan);
      setAccount(account);
      setError("");
    } else {
      setError(message);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    fetchAccount();
  }, []);

  const startAccountSetup = async () => {
    setIsLoading(true);
    const res = await axios.post("/stripe/account/setup", {
      countryCode: "CA",
    });;
    const { success, message } = res.data;
    if (success) {
      // Account was made, just want to set it up with fields
      fetchAccount();
      setError("");
    } else {
      setError(message);
      setIsLoading(false);
    }
  }

  const fieldsNeededFormChange = (e, key) => {
    setFieldsNeededForm({
      ...fieldsNeededForm,
      [key]: e.target.value,
    });
  };

  const saveFieldsNeeded = async (e) => {
    setIsLoading(true);
    const res = await axios.post("/stripe/account/save", fieldsNeededForm);
    const { success, message } = res.data;
    if (success) {
      // Regrab the account, see what new account fields required
      fetchAccount();
      setError("");
    } else {
      setError(message);
      setIsLoading(false);
    }
  }

  const onSaveAccount = async (id) => {
    setIsLoading(true);
    const res = await axios.post("/stripe/account/save/account", {
      stripeTokenId: id,
    });
    const { success, message } = res.data;
    if (success) {
      // Regrab the account, see what new account fields required
      fetchAccount();
      setError("");
    } else {
      setError(message);
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className={classes.loaderContainer}>
        <CircularProgress/>
      </div>
    );
  };
  
  if (!setupBegan) {
    return (
      <>
        <Typography  variant="h4" align="center" className={classes.title}>
          Account Setup
        </Typography>
        <Grid container alignItems="center" justify="center">
          <Button variant="outlined" onClick={startAccountSetup}>
              Begin Setup
          </Button>
        </Grid>
        <Grid container alignItems="center" justify="center" className={classes.tosText}>
          <Typography>
            By registering your account, you agree to our Services Agreement and the
            <Link href={"https://stripe.com/en-ca/connect-account/legal"}>
              {` Stripe Connected Account Agreement.`}
            </Link>
          </Typography>
        </Grid>
      </>
    )
  }
  const { verification } = account;
  console.log("account", account);
  const { fields_needed } = verification;
  console.log("fields_needed", fields_needed);
  return (
    <div>
      <Typography  variant="h4" align="center" className={classes.title}>
        Account Setup
      </Typography>
      { account.payouts_enabled && 
        <>
          <Typography variant="subtitle1" align="center" className={classes.personalTitle}>
            Congratulations. Payouts are now enabled.
          </Typography>
          { fields_needed.length > 0 && 
            <Typography variant="subtitle1" align="center" className={classes.personalTitle}>
              The following information is not needed but may be required later to remain in good standing.
            </Typography>
          }
        </>
      }
      {
        fields_needed.includes("external_account") && (
          <>
            <Elements>
              <BankAccountForm onSaveAccount={onSaveAccount} />
            </Elements>
          </>
        )
      }
      { fields_needed.length > 0 && 
        <Paper className={classes.container}>
          <Typography className={classes.personalTitle}>
            Personal Information
          </Typography>
          <Grid container justify="center" alignItems="center">
          { fields_needed.includes("legal_entity.first_name") && (
              <Grid item xs={6}>
                <Paper className={classes.container}>
                  <Typography>
                    Name
                  </Typography>
                  <Grid container justify="center" alignItems="center">
                    <Grid item xs={6}>
                      <TextField
                        label="First Name"
                        value={fieldsNeededForm["first_name"]}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => fieldsNeededFormChange(e, "first_name")}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Last Name"
                        value={fieldsNeededForm["last_name"]}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => fieldsNeededFormChange(e, "last_name")}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            )}
            {fields_needed.includes("legal_entity.dob.day") && (
              <Grid item xs={6}>
                <Paper className={classes.container}>
                <Typography>
                  Date of Birth
                </Typography>
                <Grid container justify="center" alignItems="center">
                  <Grid item xs={4}>
                    <TextField
                      label="Day"
                      value={fieldsNeededForm["day"]}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => fieldsNeededFormChange(e, "day")}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Month"
                      value={fieldsNeededForm["month"]}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => fieldsNeededFormChange(e, "month")}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Year"
                      value={fieldsNeededForm["year"]}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => fieldsNeededFormChange(e, "year")}
                    />
                  </Grid>
                </Grid>
                </Paper>
              </Grid>
            )}
            { fields_needed.includes("legal_entity.type") && (
              <Grid item xs={3}>
                <TextField
                  label="Account Type"
                  value={fieldsNeededForm["type"]}
                  margin="normal"
                  variant="outlined"
                  disabled
                  onChange={(e) => fieldsNeededFormChange(e, "type")}
                />
              </Grid>
            )}
            { fields_needed.includes("legal_entity.address.city") && (
              <Grid item xs={12}>
                <Paper className={classes.container}>
                  <Typography>
                    Address
                  </Typography>
                  <Grid container justify="center" alignItems="center">
                    <Grid item xs={12}>
                      <TextField
                        label="Address"
                        value={fieldsNeededForm["line1"]}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => fieldsNeededFormChange(e, "line1")}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="City"
                        value={fieldsNeededForm["city"]}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => fieldsNeededFormChange(e, "city")}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="Postal Code"
                        value={fieldsNeededForm["postal_code"]}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => fieldsNeededFormChange(e, "postal_code")}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="Province"
                        value={fieldsNeededForm["state"]}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => fieldsNeededFormChange(e, "state")}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            )}
            { fields_needed.includes("legal_entity.personal_id_number") && (
              <TextField
                label="Social Insurance Number"
                value={fieldsNeededForm["personal_id_number"]}
                margin="normal"
                variant="outlined"
                onChange={(e) => fieldsNeededFormChange(e, "personal_id_number")}
              />
            )}
          </Grid>
          <Grid container alignItems="center" justify="flex-end" className={classes.buttonContainer}>
            <Button variant="outlined" onClick={saveFieldsNeeded}>
                Save Details
            </Button>
          </Grid>
          {
            error ? (
              <p>{error}</p>
            ) : null
          }
        </Paper>
      }
    </div>
  );
};

export default withStyles(styles)(AccountDetails);