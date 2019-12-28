import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles, Grid, Typography } from "@material-ui/core";
import dayjs from "dayjs";
import {Link} from 'react-router-dom';
const styles = {
  commentImage: {
    maxWidth: 100,
    objectFit : "cover",
    borderRadius: "50%",
    height : 100
  },

  commentData:{
      marginLeft: 60
  },
  visibleSeperator:{
    widith : "100%",
    marginBottom: 20,
    borderBottom : "1px solid rgba(0,0,0,0.1)"
},
invisibleSeperator:{
    border :"none",
    margin: 4
}
};

class Comments extends Component {
  render() {
    const { classes, comments } = this.props;

    return (
      <Grid container>
        {comments ? (comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle} = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt="user"
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className = {classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/user/${userHandle}`}
                        color="primary"
                      >
                        {userHandle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("h: mm a, MMMM DD YYYY")}
                      </Typography>
                      <hr className={classes.invisibleSeperator} />
                      <Typography variant="body1">{body}</Typography>
                      </div>
                  </Grid>
                 
                </Grid>
              </Grid>
              {index !== comments.length -1 &&(
                <hr className={classes.visibleSeperator} />
              )}
            </Fragment>
          )
        })) :null}
       
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array
};

export default withStyles(styles)(Comments);
