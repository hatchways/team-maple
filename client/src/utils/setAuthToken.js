import axios from "axios";

// Given a token, will set it to be sent with every axios request
const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export default setAuthToken;