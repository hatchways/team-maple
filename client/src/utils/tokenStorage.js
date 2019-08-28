const tokenStorage = {
    saveAuthToken(token) {
        window.localStorage.setItem("jwtToken", token);
    },
    deleteAuthToken(token) {
        window.localStorage.removeItem("jwtToken");
    },
    getAuthToken(token) {
        return window.localStorage.getItem("jwtToken");
    },
}

export default tokenStorage;