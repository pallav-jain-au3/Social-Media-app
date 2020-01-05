import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import home from "./pages/home";
import signup from "./pages/signup";
import login from "./pages/login";
import Navbar from "./components/layout/Navbar";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import themeFile from "./util/theme";
import jwtDecode from "jwt-decode";
import AuthRoute from "./util/AuthRoute";
import { Provider } from "react-redux";
import store from "./redux/store";
import {getUserData, logoutUser} from './redux/actions/userActions';
import {SET_AUTHENTICATED} from './redux/types';
import axios from 'axios';
import user from './pages/user'

const theme = createMuiTheme(themeFile);

let token = localStorage.FBIdToken;
if (token) {
  let decodedToken = jwtDecode(token);
  if ((decodedToken.exp * 1000) < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  } else {
    store.dispatch({
      type :SET_AUTHENTICATED
    })
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData())
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home}></Route>
              <AuthRoute
                exact
                path= "/signup"
                component={signup}
              />
              <AuthRoute
                exact
                path="/login"
                component={login}
              />
              <Route exact path ="/user/:handle" component = {user}></Route>
              <Route exact path ="/user/:handle/scream/:screamId" component = {user}></Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
