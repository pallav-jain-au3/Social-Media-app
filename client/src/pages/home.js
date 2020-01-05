import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Scream from "../components/scream/Scream";
import Profile from "../components/Profile/Profile";
import { getScreams } from "../redux/actions/dataActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";


export class home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    let { screams, loading } = this.props.data;
    let recentScreamMarkup = !loading
      ? screams.map((scream, index) => <Scream key={index} scream={scream} />)
      :<p>LOADING.....</p>
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentScreamMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getScreams })(home);
