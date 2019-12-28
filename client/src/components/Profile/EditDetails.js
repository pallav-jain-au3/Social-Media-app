import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";
import Tooltip from "@material-ui/core/Tooltip";
import { IconButton, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Edit as EditIcon } from "@material-ui/icons";
const styles = {
  button: {
    color: "primary",
    float: "right"
  }
};

export class EditDetails extends Component {
  constructor() {
    super();
    this.state = {
      bio: "",
      website: "",
      location: "",
      open: false
    };
  }

  handleOpen = () => {
    this.setState({
      open: true
    });
    this.mapUserCredentialsToSate(this.props.credentials);
  };

  handleSubmit = () => {
    let userDetails = {
      bio: this.state.bio,
      location: this.state.location,
      website: this.state.website
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };
  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserCredentialsToSate(credentials);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  mapUserCredentialsToSate = credentials => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      location: credentials.location ? credentials.location : "",
      website: credentials.website ? credentials.website : ""
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Tooltip placement="top" title="Edit Profile">
          <IconButton onClick={this.handleOpen} className={classes.button}>
            <EditIcon color="primary" className={classes.button} />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          fullWidth
          onClose={this.handleClose}
          maxWidth="sm"
        >
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                onChange={this.handleChange}
                label="Bio"
                placeholder="A short decription about yourself"
                className={classes.textField}
                multiline
                row="3"
                value={this.state.bio}
                fullWidth
              />
              <TextField
                name="location"
                type="text"
                onChange={this.handleChange}
                className={classes.textField}
                label="Location"
                placeholder="Enter youtr location"
                value={this.state.location}
                fullWidth
              />
              <TextField
                name="website"
                type="text"
                onChange={this.handleChange}
                className={classes.textField}
                label="Website"
                placeholder="Enter your website"
                fullWidth
                value={this.state.website}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClose}
              variant="contained"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={this.handleSubmit}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

const mapActionsToProps = {
  editUserDetails
};

const mapStateToProps = state => ({
  credentials: state.user.credentials
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(EditDetails));
