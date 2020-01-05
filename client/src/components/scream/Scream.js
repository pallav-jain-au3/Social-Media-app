import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {withStyles,Card, CardContent,CardMedia,Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {connect} from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import {IconButton} from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat';
import MyButton from '../../util/myButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton'
const styles = {
    card :{
        display :'flex',
        marginBottom : 20
   },
   image :{
       minWidth : 200,
       objectFit : 'cover'
   },
   content :{
       padding:25
   }

}

export class Scream extends Component {


    render() {
        dayjs.extend(relativeTime)
        const {classes,
         scream : {body, createdAt, userImage, userHandle, screamId, likeCount, commentCount}, user : {authenticated, credentials :{handle}}} = this.props
        const deleteButton = authenticated && userHandle === handle ? (
          <DeleteScream screamId = {screamId} />
          ) :null
       

        return (
          <Card className = {classes.card}>
            <CardMedia image = {userImage} title = "Profile Image"  className = {classes.image}/>
            <CardContent className = {classes.content}>
                <Typography variant = "h5" color = 'primary' component = {Link} to = {`/users/${userHandle}`}>{userHandle}</Typography>
                <Typography variant = "body2" color = "textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                {deleteButton}
                <Typography variant = "body1">{body}</Typography>
                <LikeButton screamId = {screamId} />
                <span>{likeCount} Likes</span>
                <MyButton tip = "comments" >
                  <ChatIcon color = "primary" />
                </MyButton>
                <span>{commentCount} comments</span>
                <ScreamDialog screamId = {screamId} userHandle = {userHandle} openDialog = {this.props.openDialog}/>
            </CardContent>
          </Card>
        )
    }
}
const mapStateToProps = (state) => ({
  user : state.user,
}) 

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  classes:PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  openDialog:PropTypes.bool
}

export default connect(mapStateToProps)(withStyles(styles)(Scream));
