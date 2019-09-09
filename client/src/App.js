import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import jwtDecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import tokenStorage from "./utils/tokenStorage";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";

import { theme } from "./themes/theme";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
import LandingPage from "./pages/Landing";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import SubmissionPage from './components/UpSubmission';
import CreateContestPage from "./pages/CreateContest";
import ContestDetailPage from "./pages/ContestDetailPage";
import DiscoveryPage from './components/Discovery';

import "./App.css";

if (tokenStorage.getAuthToken()) {
  const token = tokenStorage.getAuthToken();
  setAuthToken(token);
  const decoded = jwtDecode(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser);
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <NavBar />
          <Route path="/" exact component={LandingPage} />
          <Route path="/signup" exact component={SignupPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path='/contests' exact component={DiscoveryPage} />
          <PrivateRoute exact path="/home" component={DashboardPage} />
          <PrivateRoute exact path="/create" component={CreateContestPage} />
          <PrivateRoute exact path="/contest/:id" component={ContestDetailPage} />
          <PrivateRoute exact path='/contest/:id/submit' component={SubmissionPage} />
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
