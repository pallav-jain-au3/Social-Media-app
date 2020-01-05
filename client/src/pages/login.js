import React, { Component } from "react";
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userActions'
import {
  withStyles,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress
} from "@material-ui/core";
import {Link} from 'react-router-dom'
import PropTypes from "prop-types";

const styles = {
  form: {
    textAlign: "center"
  },
  textField: {
    margin: `10px auto 10px auto`
  },
  pageTitle: {
    margin: `10px auto 10px auto`
  },
  button: {
    marginTop: 20,
    position :'relative'
  },
  customError:{
      color :'red',
      fontSize :'0.8rem',
      marginTop : 10
  },
  progress :{
      position:'absolute'
  }
}

export class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},

    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
  
   let userData = {
       email:this.state.email,
       password: this.state.password
   }
   this.props.loginUser(userData, this.props.history)
 
   }
  componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors){
      this.setState({
        errors:nextProps.UI.errors
      })
    }
  }
  render() {
    let {errors} = this.state;
    
    const { classes } = this.props;
    const { UI : {loading}} = this.props;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item m>
          <Typography variant="h3" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
              id="email"
              label="Email"
              helperText = {errors.email}
              error = {errors.email ? true : false}
              className={classes.textField}
              fullWidth
            />
            <TextField
              name="password"
              type="password"
              onChange={this.handleChange}
              value={this.state.password}
              id="password"
              label="Password"
              helperText = {errors.password}
              error = {errors.password ? true : false}
              className={classes.textField}
              fullWidth
            />
            {errors.general && (
                <Typography variant = "body2" className = {classes.customError}>{errors.general}</Typography> 
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled = {loading}
            >
              Login
              {loading && (
                  <CircularProgress className = {classes.progress} size = {30} />
              )}
            </Button>
            <br />
            <small>don't have a account ? signup  <Link to = '/signup'>here</Link></small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
login.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) =>({
  user : state.user,
  UI:state.UI
})

const mapActionsToProps = {
  loginUser
}
export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(login));
