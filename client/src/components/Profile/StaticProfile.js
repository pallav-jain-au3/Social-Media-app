import React , {Fragment, Component} from 'react'
import PropTypes from 'prop-types'
import {Link as MuiLink , withStyles,Paper, Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs'
import {
  LocationOn,
  Link as LinkIcon,
  CalendarToday,
  Edit as EditIcon
} from "@material-ui/icons";
const styles = {
  paper: {
    padding: 20
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
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
 };
class StaticProfile extends Component{
	

	render(){


	const {classes, profile : {createdAt, handle, imgUrl, bio, website, location}} = this.props
	return (
		<Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imgUrl} className="profile-image" alt="Profile" />
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
            </div>
          </div>
        </Paper>
		) 
		}
    }

StaticProfile.propTypes = {
	classes : PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
}

export default withStyles(styles)(StaticProfile)

