const tokenStorage = {
    saveAuthToken(token) {
        window.localStorage.setItem("jwtToken", token);
    },
    deleteAuthToken() {
        window.localStorage.removeItem("jwtToken");
    },
    getAuthToken() {
        return window.localStorage.getItem("jwtToken");
    },
}

export default tokenStorage;