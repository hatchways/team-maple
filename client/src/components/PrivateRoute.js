import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
    return (
        <Route
            {...rest}
            component={props =>
                auth.isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    )
};

const mapStateToProps = ({auth}) => ({
    auth,
});

export default connect(mapStateToProps)(PrivateRoute);