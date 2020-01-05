import React, { Component, Fragment } from 'react';
import {withStyles, Grid,Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MyButton from '../../util/myButton';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import {getScream, clearErrors} from '../../redux/actions/dataActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import LikeButton from './LikeButton';
import ChatIcon from '@material-ui/icons/Chat';
import Comments from './Comments'
import CommentForm from './CommentForm'
const styles = {
	invisibleSeperator:{
		border :"none",
		margin: 4
	},
	profileImage:{
		maxWidth: 200,
		height:200,
		objectFit :"cover", 
		borderRadius :"50%"
	},
	dialogContent:{
		padding : 20
	},
	closeButton :{
		position:"absolute",
		left : "90%"
	},

	spinnerDiv :{
		textAlign :"center",
		marginBottom : 50,
		marginTop : 50
	},
	visibleSeperator:{
		widith : "100%",
		marginBottom: 20,
		border : "1px solid rgba(0,0,0,0.1)"
	}
	

}


class ScreamDialog extends Component{
	constructor(){
		super()
		this.state = {
			open:false,
			oldPath: '',
			newPath:''
		}
	}

  componentDidMount(){
    if(this.props.openDialog){
      this.handleOpen()
    }
  }
	handleOpen = () =>{
		const {userHandle , screamId} = this.props;
		let oldPath = window.location.pathname;
		let newPath  = `/user/${userHandle}/scream/${screamId}`;
		if (oldPath === newPath){
			oldPath = `/user/${userHandle}`
		}
		window.history.pushState(null,null, newPath)
		this.setState({
			open:true,
			oldPath:oldPath,
			newPath:newPath
		})
		this.props.getScream(this.props.screamId)
	}

	handleClose = () =>{
		window.history.pushState(null,null, this.state.oldPath)
		this.setState({
			open:false
		})
		this.props.clearErrors()
	}
	render(){


 		const {classes, scream :{screamId, body, createdAt, userHandle, likeCount, commentCount, userImage, comments}, UI:{loading}} = this.props;
		 const dialogMarkup = loading ? (
 			<div className = {classes.spinnerDiv}>
 			<CircularProgress size = {200} color = "primary" thickness = {2}/>
 			</div>
 			):(<Fragment>
 				<Grid container spacing = {6}>
 					<Grid item sm = {5}>
 						<img src = {userImage} alt = "Profile" className = {classes.profileImage}/>
 					</Grid>
 					<Grid item sm= {7}>

 						<Typography variant = "h5" color = "primary" component = {Link} to = {`/user/${userHandle}`}>
 							@{userHandle}
 						</Typography>
 						<hr className = {classes.invisibleSeperator} />
 						<Typography color = "textSecondary" variant = "body2">
 							{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
 						</Typography>
 						<hr className = {classes.invisibleSeperator} />
 						<Typography variant = "body1">
 							{body}
 						</Typography>
 					 	<LikeButton screamId = {screamId} />
                		<span>{likeCount} Likes</span>
                		<MyButton tip = "comments" >
                  			<ChatIcon color = "primary" />
                		</MyButton>
						<span>{commentCount} comments</span>
 					</Grid>
				</Grid> 
				<hr className = {classes.visibleSeperator} />
				
				<Comments comments = {comments} />
				<CommentForm screamId = {screamId}/>
				</Fragment>	
 			)
		return(
		<Fragment>
			<MyButton onClick = {this.handleOpen} tip = "Expand" className = {classes.expandButton}>
				<UnfoldMoreIcon color = "primary" />
			</MyButton> 
			<Dialog open = {this.state.open}
			fullWidth
			onClose = {this.handleClose}
			maxWidth="sm" >
			 <MyButton tip = "close" onClick = {this.handleClose} tipClassName = {classes.closeButton}>
						  	<CloseIcon />
			</MyButton> 
				<DialogContent className = {classes.dialogContent}>
					{dialogMarkup}
				</DialogContent> 
			</Dialog> 
		</Fragment>
			)
	}
}

ScreamDialog.propTypes = {
	getScream : PropTypes.func.isRequired,
	clearErrors : PropTypes.func.isRequired,
	classes:PropTypes.object.isRequired,
	screamId:PropTypes.string.isRequired,
	userHandle:PropTypes.string.isRequired,
	scream:PropTypes.object.isRequired,
	UI:PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
	scream : state.data.scream,
	UI:state.UI
})

const mapActionsToProps = {
	getScream,
	clearErrors
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog))

