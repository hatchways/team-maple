import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

const Dashboard = ({ logoutUser }) => {
    const handleClick = () => {
        logoutUser();
    }
    return (
        <div>
            This is the dashboard
            <button onClick={handleClick}>Logout</button>
        </div>
    );
}

export default connect(null, { logoutUser })(Dashboard);