import React, { Component, Fragment } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button
} from "@material-ui/core";

import { connect } from "react-redux";
import MyButton from "../../util/myButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteScream } from "../../redux/actions/dataActions";

class DeleteScream extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }
  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  deleteScream = () => {
    this.props.deleteScream(this.props.screamId);
    this.setState({
      open: false
    });
  };
  render() {
    return (
      <Fragment>
        <MyButton tip="Delete Scream" onClick={this.handleOpen}>
          <DeleteIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Are you sure you want to delete ?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteScream} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default connect(null, { deleteScream })(DeleteScream);
