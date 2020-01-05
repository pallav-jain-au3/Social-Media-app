import React, { Component , Fragment} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import {Menu, MenuItem, IconButton, Tooltip, Typography, Badge} from '@material-ui/core';
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatIcon from '@material-ui/icons/Chat';
import {Favorite as FavoriteIcon} from '@material-ui/icons';
import {markNotificationsRead} from '../../redux/actions/userActions';


class Notifications extends Component {
    constructor(){
        super()
        this.state = {
            anchorEl : null
        }
    }
    handleOpen = (event) =>{
        this.setState({
            anchorEl : event.target
        })
    }

    handleClose = () =>{
        this.setState({
            anchorEl : null
        })
    }

    onMenuOpened = () =>{
        let notificationIds = this.props.notifications.filter(not => not.read == false).map(not => not.notificationId);
        this.props.markNotificationsRead(notificationIds)
    }

    render() {
         dayjs.extend(relativeTime)
        let notificationIcon;
        let notifications = this.props.notifications;
        let anchorEl = this.state.anchorEl;
        if (notifications && notifications.length > 0){
            notifications.filter(not => not.read == false ).length > 0 ? (
                notificationIcon = (
                    <Badge badgeContent = {notifications.filter(not => not.read == false).length}
                     color = "secondary">
                         <NotificationsIcon />
                    </Badge>
                )
            ) :(
                notificationIcon = <NotificationsIcon />
            )
        }
        else {
            notificationIcon = <NotificationsIcon />
        }

        let notificationsMarkup =  (notifications && notifications.length > 0) ?
            notifications.map(not => {
                const verb = not.type === 'like'?'liked' : 'commented on';
                const time = dayjs(not.createdAt).fromNow();
                const iconColor = not.read ? "primary" : "secondary";
                const icon = not.type === "like" ? (<FavoriteIcon color = {iconColor}  style = {{marginTop : 10}}/>) :
                (<ChatIcon color = {iconColor}  style = {{marginTop : 10}}/>)
                return (
                    <MenuItem onClick = {this.handleClose} 
                    key = {not.createdAt}>
                    {icon}
                    <Typography component = {Link} 
                    variant = "body1" 
                    to ={`/user/${not.recipient}/scream/${not.screamId}`} 
                    >
                    {`${not.sender} ${verb} on your scream ${time}`}
                    </Typography>
                    </MenuItem>
                    )

            }):(
            <MenuItem onClick= {this.handleClose}>
                You have no notifications
            </MenuItem> )

        

    
        return (
            <Fragment>
                <Tooltip placement = "top" title = "notifications">
                    <IconButton aria-owns = {anchorEl ? 'simple-menu': undefined}
                    aria-haspopup = "true"
                    onClick = {this.handleOpen}>
                    {notificationIcon}
                    </IconButton> 
                </Tooltip>
                <Menu
                 anchorEl = {anchorEl}
                 open = {Boolean(anchorEl)}
                 onClose = {this.handleClose}
                 onEntered = {this.onMenuOpened}
                 >
                 {notificationsMarkup}
                 </Menu>


            </Fragment>
        )
    }
}

Notification.propTypes = {
    markNotificationsRead : PropTypes.object.isRequired,
    notifications:PropTypes.array.isRequired
}
const mapStateToProps = state =>({
    notifications: state.user.notifications
})
export default connect(mapStateToProps, {markNotificationsRead})(Notifications)