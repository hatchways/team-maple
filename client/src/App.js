import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" exact component={LandingPage} />
        <Route path="/signup" exact component={SignupPage} />
        <Route path="/login" exact component={LoginPage} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
