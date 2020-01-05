import React, { Component , Fragment} from 'react'
import PropTypes  from 'prop-types';
import {withStyles, TextField, Button,Grid} from '@material-ui/core';
import {connect} from 'react-redux';
import {submitComment} from '../../redux/actions/dataActions'

const styles = {
    button :{
        mariginTop : 5
    }
}

class CommentForm extends Component {
    constructor(){
        super()
        this.state = {
            body: '', 
            errors : {} 
        }
    }

    componentWillReceiveProps = (nextProp) =>{
        if (nextProp.UI.errors){
            this.setState({
                errors:nextProp.UI.errors
            })
        }
    }

    handleSubmit = (event) =>{
        event.preventDefault()
        let commentData = {
            body : this.state.body
        }
         this.props.submitComment(commentData,this.props.screamId);
         this.setState({
             body : "",
             errors : {}
         })
    } 

    handleChange = (event) =>{
        this.setState({
            body: event.target.value
        })
    }
     
    render() { 
        const {classes, authenticated} = this.props;
        const errors = this.state.errors;
        const commentMarkup = authenticated ? (
            <Grid container>
                <form onSubmit = {this.handleSubmit}>
                    <TextField 
                    onChange = {this.handleChange} 
                    type = "text"
                    name = "body"
                    multiline
                    row = "3"
                    error = {errors.comment ? true : false}
                    helperText = {errors.comment}
                    value = {this.state.body}
                    lable = "Add comment"
                    placeholder = "Enter your comment..." 
                    fullWidth
                   
                    className = {classes.textField}
                    />
                    <Button type = "submit" 
                    onClick = {this.handleSubmit}
                     color = "primary"
                     variant = "contained"
                     className = {classes.button}
                    >Add comment</Button>
                </form>
            </Grid>
            
        ): null
        return commentMarkup
    }
}

CommentForm.propTypes = {
    classes: PropTypes.object.isRequired,
    screamId:PropTypes.string.isRequired,
    submitComment :PropTypes.func.isRequired,
    UI:PropTypes.object.isRequired,
    authenticated:PropTypes.bool.isRequired

}
const mapStateToProps = (state) => ({
    UI:state.UI,
    authenticated:state.user.authenticated
})
 
export default connect(mapStateToProps, {submitComment})(withStyles(styles)(CommentForm));