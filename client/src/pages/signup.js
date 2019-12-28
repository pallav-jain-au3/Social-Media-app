import React, { Component } from "react";
import {connect} from 'react-redux'
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
import {signUpUser} from '../redux/actions/userActions'

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

export class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword :"",
      handle:"",
      errors: {},
      loading: false
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
  this.setState({
      loading : true
  })
   let newUserData = {
       email:this.state.email,
       password: this.state.password,
       confirmPassword: this.state.confirmPassword,
       handle: this.state.handle,
   }
    this.props.signUpUser(newUserData, this.props.history)
   
   }

   componentWillReceiveProps(nextProps){
     if(nextProps.UI.errors){
       this.setState({
         errors:nextProps.UI.errors
       })
     }
   }
  render() {
    
    const {UI:{loading}, classes } = this.props;
    console.log(loading)
    const {errors} = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item m>
          <Typography variant="h3" className={classes.pageTitle}>
            Signup
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
            <TextField
              name="confirmPassword"
              type="password"
              onChange={this.handleChange}
              value={this.state.confirmPassword}
              id="confirmPassword"
              label="Confirm Password"
              helperText = {errors.confirmPassword}
              error = {errors.confirmPassword ? true : false}
              className={classes.textField}
              fullWidth
            />
            <TextField
              name="handle"
              type="handle"
              onChange={this.handleChange}
              value={this.state.handle}
              id="handle"
              label="handle"
              helperText = {errors.handle}
              error = {errors.handle ? true : false}
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
              Signup
              {loading && (
                  <CircularProgress className = {classes.progress} size = {30} />
              )}
            </Button>
            <br />
            <small>Aready have an account ? login  <Link to = '/login'>here</Link></small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
const mapStateToProps = (state) =>({
  user: state.user,
  UI: state.UI
})

const mapActionsToProps = {
  signUpUser
}

signup.propTypes = {
  classes: PropTypes.object.isRequired
};
export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(signup))
