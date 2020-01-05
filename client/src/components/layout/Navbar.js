import React, { Component, Fragment } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Tooltip,
  IconButton
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from './Notifications'
import PostScream from "../scream/PostScream";
export class Navbar extends Component {
  handlePostScream = () => {
    console.log("post scream clicked");
  };
  render() {
    const { authenticated } = this.props;

    return (
      <AppBar position="fixed">
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <PostScream />
              <Notifications />
              <Tooltip title="Home" placement="top">
                <IconButton onClick={this.handlePostScream} component = {Link} to = "/">
                  <HomeIcon/>
                </IconButton>
              </Tooltip>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
