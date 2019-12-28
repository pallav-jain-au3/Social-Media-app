import React, { Component, Fragment } from 'react';
import {withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { postScream } from "../../redux/actions/dataActions";
import Tooltip from '@material-ui/core/Tooltip';
import {IconButton, TextField} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import MyButton from '../../util/myButton';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';


const styles = {
	submitButton :{
		position :'relative',
		marginTop : 10,
		float:"right"
	},
	spinnerProgress:{
		position:'absolute'
	},
	closeButton :{
		position:'absolute',
		left :'91%',
		top:"6%"

	}
}

class PostScream  extends Component{

	 
	constructor(){
		super()
		this.state = {
			open:false,
			body:'',
			errors: {}
			
		}
	}

	handleOpen = () =>{
		this.setState({
			open : true
		})
	}

	handleClose = () =>{
		this.setState({
			open : false,
			errors : '',
			body : ''
		})
		console.log("state",this.state)
	}	
	handleChange = (event) =>{
		this.setState({
			body:event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault();
		if (this.state.body.trim() == ''){
			let errors = {body : "body must not be empty"}
			this.setState({
				errors:errors
			})
			return
		}
		let newScream = {
			body : this.state.body
		}

		this.props.postScream(newScream)
		this.setState({
			errors : {},
			open : false,
			body : ''
		})
		

	}

	componentWillReceiveProps = (nextProps)=>{
		if (nextProps.UI.errors){
			this.setState({
				errors:nextProps.UI.errors
			})
		}
	}	
	
	
	render(){
		const {errors} = this.state;
		console.log(errors)
		const {classes, UI : {loading}} = this.props
		return (
			<Fragment>
				<MyButton tip = "Post a scream" onClick = {this.handleOpen}>
					<AddIcon color = "primary" />
				</MyButton>	
					<Dialog open = {this.state.open}
					 fullWidth
					  onClose = {this.handleClose}
					  maxWidth = "sm">
						  <MyButton tip = "close" onClick = {this.handleClose} tipClassName = {classes.closeButton}>
						  	<CloseIcon />
						  </MyButton> 
						<DialogTitle>
						Post a Scream
						</DialogTitle>
						<DialogContent>
							<form>
								<TextField 
								fullWidth
								name = "body"
								onChange = {this.handleChange}
								value = {this.state.body}
								type = "text"
								multiline 
		       				    row = "3" 
								placeholder = "Enter scream here"
								label = "Scream!!"
								error = {errors.body ? true : false}
								helperText = {errors.body}
								id = "body"
								/> 
								<Button type = "submit"
								onClick = {this.handleSubmit}
								disabled = {loading}
								variant = "contained"
								color = "primary"
								className = {classes.submitButton}
								 >
								 submit
									{loading && (
										<CircularProgress className = {classes.spinnerProgress} size = {30} />	
										)}
								</Button>

							</form>





						</DialogContent>
					</Dialog>
				
			</Fragment>
			)
	}
}

const mapStateToProps = (state) =>({
	UI : state.UI
})

export default connect(mapStateToProps, {postScream} )(withStyles(styles)(PostScream))