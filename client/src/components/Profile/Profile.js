import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import EditDetails from "./EditDetails";
import {
  Paper,
  withStyles,
  Link as MuiLink,
  Typography,
  Button,
  IconButton,
  Tooltip,
  CircularProgress
} from "@material-ui/core";
import {
  LocationOn,
  Link as LinkIcon,
  CalendarToday,
  Edit as EditIcon
} from "@material-ui/icons";
import dayjs from "dayjs";
import { uploadImage, logoutUser } from "../../redux/actions/userActions";
import ProtoTypes from "prop-types";
const styles = {
  paper: {
    padding: 20
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%"
      }
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%"
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle"
      },
      "& a": {
        color: "#00bcd4"
      }
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer"
      }
    }
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px"
    }
  }
};

export class Profile extends Component {
  handleInputChange = event => {
    const image = event.target.files[0];
    let formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };
  handleEditPicture = () => {
    let fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleLogoutClick = () => {
    this.props.logoutUser();
  };
  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, bio, location, imgUrl, website },
        loading,
        authenticated
      }
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imgUrl} className="profile-image" alt="Profile" />
              <input
                type="file"
                id="imageInput"
                onChange={this.handleInputChange}
                hidden="hidden"
              />
              <Tooltip title="Edit Profile Image" placement="top">
                <IconButton onClick={this.handleEditPicture}>
                  <EditIcon color="primary" />
                </IconButton>
              </Tooltip>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/user/${handle}`}
                variant="body2"
                color="primary"
              >
                @{handle}
              </MuiLink>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              {location && (
                <Fragment>
                  <LocationOn color="primary" />
                  <span>{location}</span>
                  <hr />
                </Fragment>
              )}

              {website && (
                <Fragment>
                  <LinkIcon color="primary" />
                  <a href={website} ref="noopener noreferrer" target="_blank">
                    {" "}
                    {website}
                  </a>
                  <hr />
                </Fragment>
              )}
              <CalendarToday color="primary" />
              <span>{dayjs(createdAt).format("MMM YYYY")}</span>
              <Button
                variant="contained"
                onClick={this.handleLogoutClick}
                color="primary"
              >
                Logout
              </Button>
            </div>
            <EditDetails />
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No profile found , please login
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signin"
            >
              Signin
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <Fragment>
        <CircularProgress color="primary" size={30} />
      </Fragment>
    );

    return profileMarkup;
  }
}
Profile.propTypes = {
  classes: ProtoTypes.object.isRequired,
  logoutUser: ProtoTypes.func.isRequired,
  uploadImage: ProtoTypes.func.isRequired
};
const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage };
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
