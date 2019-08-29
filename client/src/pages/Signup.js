import React from "react";
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";
import NavBar from "../components/NavBar";
import SignUpForm from "../components/SignUpForm";

const styles = theme => ({
    grid: {
        marginTop: theme.spacing(10),
    }
})

const Signup = ({classes }) => {
    return (
        <div>
            <Grid container spacing={0} alignItems="center" justify="center" className={classes.grid}>
                <Grid item xs={8} sm={6} lg={4}>
                    <SignUpForm />
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles)(Signup);