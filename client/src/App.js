import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import jwtDecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import tokenStorage from "./utils/tokenStorage";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { getProfile } from "./actions/profileActions";
import { getConversations } from "./actions/conversationActions";
import { initializeSocket } from "./actions/socketActions";
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
import DiscoveryPage from './pages/Discovery';
import ProfilePage from "./pages/Profile";
import ChatPage from "./pages/Chat";
import SummaryPage from './pages/SubmissionComplete';
import PaymentDetailPage from "./pages/PaymentDetails";

import "./App.css";

if (tokenStorage.getAuthToken()) {
  const token = tokenStorage.getAuthToken();
  const decoded = jwtDecode(token);
  
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    tokenStorage.deleteAuthToken();
    store.dispatch(logoutUser);
    window.location.href = "./login";
  } else {
    setAuthToken(token);
    store.dispatch(setCurrentUser(decoded));
    store.dispatch(getProfile(decoded.userId));
    store.dispatch(getConversations(decoded.userId));
    store.dispatch(initializeSocket(token));
  }
}

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <NavBar />
          <Route path="/" exact component={LoginPage} />
          <Route path="/signup" exact component={SignupPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path='/contests' exact component={DiscoveryPage} />
          <PrivateRoute exact path="/home" component={DiscoveryPage} />
          <PrivateRoute exact path="/create" component={CreateContestPage} />
          <PrivateRoute exact path="/contest/:id" component={ContestDetailPage} />
          <PrivateRoute exact path='/contest/:id/submit' component={SubmissionPage} />
          <PrivateRoute exact path='/submitted/:subId' component={SummaryPage} />
          <PrivateRoute exact path='/profile/:id' component={ProfilePage} />
          <PrivateRoute exact path='/chat' component={ChatPage} />
          <Route exact path="/payment" component={PaymentDetailPage} />
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
